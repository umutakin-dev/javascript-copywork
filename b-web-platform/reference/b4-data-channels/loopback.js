// B4 · loopback.js — wire two RTCPeerConnections together in one page (from B3).
// The data-channel exercises care about the CHANNEL, not the handshake you already
// learned, so this tucks the B3 wiring behind two helpers.
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection

/** Trickle each side's ICE candidates straight to the other. */
export function connectLoopback(pcA, pcB) {
  pcA.onicecandidate = (e) => e.candidate && pcB.addIceCandidate(e.candidate);
  pcB.onicecandidate = (e) => e.candidate && pcA.addIceCandidate(e.candidate);
}

/** Run the offer/answer exchange A → B → A. Call AFTER adding channels/tracks. */
export async function negotiate(pcA, pcB) {
  const offer = await pcA.createOffer();
  await pcA.setLocalDescription(offer);
  await pcB.setRemoteDescription(offer);
  const answer = await pcB.createAnswer();
  await pcB.setLocalDescription(answer);
  await pcA.setRemoteDescription(answer);
}
