import { TextSize } from "victory";

import "../app/stories.css";

// Victory measures label text in the page, so label, legend and tooltip
// geometry depends on the installed fonts and on how the OS rounds font
// metrics (Linux rounds ascent and descent to whole pixels; macOS doesn't).
// Use Victory's own approximation instead, as it does without a DOM: plain
// arithmetic, the same on every machine.
const { impl } = TextSize._approximateTextSizeInternal;
TextSize._approximateTextSizeInternal.impl = (text, style) =>
  impl(text, style, true);
