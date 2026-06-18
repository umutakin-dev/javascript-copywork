// B2 · 07 (worklet) — runs on the AUDIO thread, inside an AudioWorkletGlobalScope.
// No DOM here. registerProcessor names the processor; the page instantiates it as
// an AudioWorkletNode("noise-gain"). process() is called for every ~128-sample
// block and must fill the outputs.
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor

class NoiseProcessor extends AudioWorkletProcessor {
  // Declare AudioParams the node exposes (controllable from the main thread).
  static get parameterDescriptors() {
    return [{ name: "gain", defaultValue: 0.1, minValue: 0, maxValue: 1 }];
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0]; // one output, an array of channels
    const gain = parameters.gain; // length 1 (constant) or 128 (automated this block)
    for (const channel of output) {
      for (let i = 0; i < channel.length; i++) {
        const g = gain.length > 1 ? gain[i] : gain[0];
        channel[i] = (Math.random() * 2 - 1) * g; // white noise
      }
    }
    return true; // keep the processor alive
  }
}

registerProcessor("noise-gain", NoiseProcessor);
