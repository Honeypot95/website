(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{231:function(t,e,n){"use strict";n.r(e);var a=n(6),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"interference-example"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#interference-example"}},[t._v("#")]),t._v(" Interference example")]),t._v(" "),n("p",[t._v("Colin Eberhardt's and Ben Smith's "),n("a",{attrs:{href:"https://github.com/ColinEberhardt/wasm-interference",target:"_blank",rel:"noopener noreferrer"}},[t._v("WebAssembly interference effect"),n("OutboundLink")],1),t._v(", if it was written in AssemblyScript.")]),t._v(" "),n("h2",{attrs:{id:"contents"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#contents"}},[t._v("#")]),t._v(" Contents")]),t._v(" "),n("ul",[n("li",[t._v("Exporting functions and variables from a WebAssembly module.")]),t._v(" "),n("li",[t._v("Calling functions and reading variables exported from WebAssembly.")]),t._v(" "),n("li",[t._v("Utilizing 32-bit floating point math to speed up calculations by utilizing "),n("code",[t._v("Mathf")]),t._v(".")]),t._v(" "),n("li",[t._v("Keeping an image buffer within the module's memory and copying it to a canvas.")]),t._v(" "),n("li",[t._v("Manually growing memory depending on the size of the viewport on the browser side.")]),t._v(" "),n("li",[t._v("And finally: Continuously updating and rendering the image buffer.")])]),t._v(" "),n("h2",{attrs:{id:"example"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[t._v("#")]),t._v(" Example")]),t._v(" "),n("div",{staticClass:"custom-block danger"},[n("p",{staticClass:"custom-block-title"},[t._v("EPILEPSY WARNING")]),t._v(" "),n("p",[t._v("A very small percentage of individuals may experience epileptic seizures when exposed to certain light patterns or flashing lights. Exposure to certain patterns or backgrounds on a computer screen may induce an epileptic seizure in these individuals. Certain conditions may induce previously undetected epileptic symptoms even in persons who have no history of prior seizures or epilepsy.")]),t._v(" "),n("p",[t._v("If you experience any of the following symptoms while viewing - dizziness, altered vision, eye or muscle twitches, loss of awareness, disorientation, any involuntary movement, or convulsions - IMMEDIATELY discontinue use and consult your physician.")])]),t._v(" "),n("div",{staticClass:"language-editor extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('#!optimize=speed&runtime=stub\nvar width  = 320;\nvar height = 200;\n\n// Let\'s utilize the entire heap as our image buffer\nexport const offset = __heap_base;\n\n/** Sets a single pixel\'s color. */\nfunction set(x: i32, y: i32, v: f32): void {\n  var vi = <i32>v;\n  store<i32>(offset + ((width * y + x) << 2), ~vi << 24 | vi << 8);\n}\n\n/** Computes the distance between two pixels. */\nfunction distance(x1: i32, y1: i32, x2: f32, y2: f32): f32 {\n  var dx = <f32>x1 - x2;\n  var dy = <f32>y1 - y2;\n  return Mathf.sqrt(dx * dx + dy * dy);\n}\n\n/** Performs one tick. */\nexport function update(tick: f32): void {\n  var w = <f32>width;\n  var h = <f32>height;\n  var hw = w * 0.5,\n      hh = h * 0.5;\n  var cx1 = (Mathf.sin(tick * 2) + Mathf.sin(tick      )) * hw * 0.3 + hw,\n      cy1 = (Mathf.cos(tick)                            ) * hh * 0.3 + hh,\n      cx2 = (Mathf.sin(tick * 4) + Mathf.sin(tick + 1.2)) * hw * 0.3 + hw,\n      cy2 = (Mathf.sin(tick * 3) + Mathf.cos(tick + 0.1)) * hh * 0.3 + hh;\n  var res = <f32>48 / Mathf.max(w, h);\n  var y = 0;\n  do {\n    let x = 0;\n    do {\n      set(x, y, Mathf.abs(\n        Mathf.sin(distance(x, y, cx1, cy1) * res) +\n        Mathf.sin(distance(x, y, cx2, cy2) * res)\n      ) * 120);\n    } while (++x != width)\n  } while (++y != height)\n}\n\n/** Recomputes and potentially grows memory on resize of the viewport. */\nexport function resize(w: i32, h: i32): void {\n  width = w; height = h;\n  // Pages are 64kb. Rounds up using mask 0xffff before shifting to pages.\n  var needed = <i32>((offset + (w * h * sizeof<i32>() + 0xffff)) & ~0xffff) >>> 16;\n  var actual = memory.size();\n  if (needed > actual) memory.grow(needed - actual);\n}\n\n#!html\n<canvas id="canvas" style="width: 100%; height: 100%; background: #aff"></canvas>\n<script>\nvar step = 0.012;\nloader.instantiate(module_wasm).then(({ exports }) => {\n  const canvas = document.getElementById("canvas");\n  const context = canvas.getContext("2d");\n\n  // Upscale the image to speed up calculations\n  const upscaleFactor = 4;\n\n  var width, height, image;\n\n  // Inform the module about the viewport\'s size, incl. on resize\n  function onresize() {\n    width = (canvas.offsetWidth / upscaleFactor) | 0;\n    height = (canvas.offsetHeight / upscaleFactor) | 0;\n    canvas.width = width;\n    canvas.height = height;\n    image = context.createImageData(width, height);\n    exports.resize(width, height);\n  }\n  onresize();\n  new ResizeObserver(onresize).observe(canvas);\n\n  // Keep updating the image\n  var tick = 0.0;\n  (function update() {\n    requestAnimationFrame(update);\n    exports.update(tick += step);\n    new Uint32Array(image.data.buffer).set(new Uint32Array(exports.memory.buffer, exports.offset, width * height));\n    context.putImageData(image, 0, 0);\n  })();\n});\n<\/script>\n')])])]),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),n("p",[t._v("The example makes one important assumption: Since we are not using a sophisticated runtime, we can instead repurpose the entire heap, starting at "),n("code",[t._v("__heap_base")]),t._v(", as our image buffer.")]),t._v(" "),n("p",[t._v("As soon as this condition is no longer met, one would instead either reserve some space by specifying a suitable "),n("code",[t._v("--memoryBase")]),t._v(" or export a dynamically instantiated chunk of memory, like an "),n("code",[t._v("Uint32Array")]),t._v(", and utilize it as the image buffer both in WebAssembly and in JavaScript.")])]),t._v(" "),n("h2",{attrs:{id:"running-locally"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#running-locally"}},[t._v("#")]),t._v(" Running locally")]),t._v(" "),n("p",[t._v("Set up a new AssemblyScript project as described in "),n("RouterLink",{attrs:{to:"/quick-start.html"}},[t._v("Quick start")]),t._v(" and copy "),n("code",[t._v("module.ts")]),t._v(" to "),n("code",[t._v("assembly/index.ts")]),t._v(" and "),n("code",[t._v("index.html")]),t._v(" to the project's top-level directory. Edit the build commands in "),n("code",[t._v("package.json")]),t._v(" to include")],1),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("--runtime stub\n")])])]),n("p",[t._v("The example can now be compiled with")]),t._v(" "),n("div",{staticClass:"language-sh extra-class"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run asbuild\n")])])]),n("p",[t._v("To view the example, one can modify the instantiation in "),n("code",[t._v("index.html")]),t._v(" from")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("loader"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("instantiate")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module_wasm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" exports "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n")])])]),n("p",[t._v("to")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("WebAssembly"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("instantiateStreaming")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./build/optimized.wasm'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  JSMath"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Math\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" exports "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n")])])]),n("p",[t._v("because using the "),n("RouterLink",{attrs:{to:"/loader.html"}},[t._v("loader")]),t._v(" is not ultimately necessary here (no managed objects are exchanged). If the loader is used instead, it will automatically provide "),n("code",[t._v("JSMath")]),t._v(".")],1),t._v(" "),n("p",[t._v("Some browsers may restrict "),n("code",[t._v("fetch")]),t._v("ing local resources when just opening "),n("code",[t._v("index.html")]),t._v(" now, but one can set up a local server as a workaround:")]),t._v(" "),n("div",{staticClass:"language-sh extra-class"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --save-dev http-server\nhttp-server "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v(" -o -c-1\n")])])])])}),[],!1,null,null,null);e.default=s.exports}}]);