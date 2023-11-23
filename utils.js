import tinycolor from "tinycolor2";

export function hexToHSL(hex) {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Convert RGB to HSL
  const rRatio = r / 255;
  const gRatio = g / 255;
  const bRatio = b / 255;

  const max = Math.max(rRatio, gRatio, bRatio);
  const min = Math.min(rRatio, gRatio, bRatio);

  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rRatio:
        h = (gRatio - bRatio) / d + (gRatio < bRatio ? 6 : 0);
        break;
      case gRatio:
        h = (bRatio - rRatio) / d + 2;
        break;
      case bRatio:
        h = (rRatio - gRatio) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
}
export function analyzeContent(htmlString) {
  const tagMapping = {
    span: "textpara",
    h1: "textheading1",
    h2: "textheading2",
    h3: "textheading3",
    p: "textpara",
  };

  for (const tag in tagMapping) {
    const regex = new RegExp(`<${tag}\\s*.*?>(.*?)<\\/${tag}>`, "i");
    const match = htmlString.match(regex);
    let className = "";
    let textContent = "";
    let style = "";

    if (match) {
      const [, content] = match;
      className = tagMapping[tag];
      textContent = content.trim();

      const styleMatch = htmlString.match(
        new RegExp(`style\\s*=\\s*["'](.*?)["']`, "i")
      );
      if (styleMatch) {
        style = styleMatch[1];
      }

      break;
    }
  }

  return { className, content: textContent, style: style };
}

// HELPER FUNCTIONS
export function getComponentStyle(pseudoComponent) {
  switch (pseudoComponent.type) {
    case "SECTION":
      return {
        border: null,
        background: {
          colorData: {
            color: ["HSL", ...rgbToHsla(psuedoComponent.style.backgroundColor)],
            gradient: null,
          },
          assetData: psuedoComponent.backgroundImage
            ? {
                asset: {
                  alpha: null,
                  animated: false,
                  bpp: null,
                  contentType: "image/jpeg",
                  etag: '"31343-5fc848a346a51"',
                  filesize: 201539,
                  height: 1275,
                  image: null,
                  recommendedFormat: null,
                  url: "repository:/design-universal-template-unsplash-fPcB3Km7PyE.jpg",
                  width: 1920,
                },
                repeat: [false, false],
                position: ["50%", "50%"],
                size: "cover",
                scrollEffect: "parallax",
                opacity: 0.6,
              }
            : null,
        },
      };
    case "BUTTON":
      return {
        globalId: "D0C8AC09-0EF1-4821-8586-2D70D3ED97B6",
        globalName: "[button.1]",
        type: "web.data.styles.StyleButton",
        text: {
          size: null,
        },
      };

    default:
      return null;
  }
}

export function getTextContent(content) {
  const { className, content, style } = analyzeContent(content);
  return `<p class=\"${className}\" style=\"${style}\"><span>${content}</span></p>`;
}

export function getBorderRadius(radius) {
  if (radius == false) {
    return [0, 0, 0, 0];
  }
  return [radius, radius, radius, radius];
}

function extractRGBA(colorString) {
  const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;
  const match = colorString.match(rgbaRegex);

  if (match) {
    const [, r, g, b, a] = match;
    return {
      r: parseInt(r, 10),
      g: parseInt(g, 10),
      b: parseInt(b, 10),
      a: a ? parseFloat(a) : 1,
    };
  } else {
    // Return default values if no match
    return { r: 0, g: 0, b: 0, a: 1 };
  }
}

export function rgbToHsla(colorString) {
  const { r, g, b, a } = extractRGBA(colorString);
  const color = tinycolor({ r, g, b, a });
  const hsl = color.toHsl();
  return {
    h: hsl.h / 360,
    s: hsl.s,
    l: hsl.l,
    a: hsl.a,
  };
}
