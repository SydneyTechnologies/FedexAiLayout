import {
  getBorderRadius,
  getComponentStyle,
  getTextContent,
  rgbToHsla,
} from "./utils";
// Converts pseudo JSON to WSB format

class WsbTranslator {
  constructor(sourceJson) {
    this.componentMap = this.index(sourceJson);
    return this.translate(sourceJson);
  }

  // takes in a JSON object that contains pseudo components and creates a map of each component with a unique UUID
  index(sourceJson) {
    const componentIdMap = {};
    const componentList = sourceJson.components;

    // iterate through each component and assign a unique UUID
    componentList.forEach((component) => {
      componentIdMap[component.id] = { id: uuid(), data: component };
    });
  }

  getSectionComponent(psuedoComponent) {
    return {
      id: this.componentMap[psuedoComponent.id].id,
      inTemplate: false,
      orderIndex: 3,
      stretch: true,
      wrap: false,
      kind: "SECTION",
      left: psuedoComponent.left,
      top: psuedoComponent.top,
      width: psuedoComponent.width,
      height: psuedoComponent.height,
      relIn: null,
      relTo: null,
      relPage: null,
      relPara: null,
      style: getComponentStyle(psuedoComponent),
      mobileSettings: {
        size: "cover",
      },
      pin: 0,
      title: psuedoComponent.id,
      selectedTheme: "Black",
      selectedGradientTheme: null,
    };
  }

  getTextComponent(psuedoComponent) {
    return {
      id: psuedoComponent.id,
      inTemplate: false,
      orderIndex: 10,
      wrap: false,
      mobileDown: false,
      onHover: null,
      kind: "TEXT",
      left: psuedoComponent.left,
      top: psuedoComponent.top,
      width: psuedoComponent.width,
      height: psuedoComponent.height,
      relIn: {
        id: psuedoComponent.parent
          ? this.componentMap[psuedoComponent.parent]
          : null,
        top:
          psuedoComponent.top -
          this.componentMap[psuedoComponent.parent].data.top,
        left:
          psuedoComponent.left -
          this.componentMap[psuedoComponent.parent].data.left,
        right: -250,
        bottom: -250,
      },
      relTo: null,
      relPage: null,
      relPara: null,
      verticalAlignment: "top",
      mobileHide: false,
      mobileSettings: {
        align: null,
        font: 0,
      },
      content: getTextContent(psuedoComponent.content),
      text: "",
      styles: [],
      paras: [
        [
          1,
          psuedoComponent.text.length,
          {
            align: psuedoComponent.align,
            type: "web.data.styles.StylePara",
          },
        ],
      ],
      links: [],
      themeOverrideColor: null,
      themeHighlightColor: null,
      themeShadowBlurRadius: 3,
      themeShadowColor: null,
      themeShadowOffsetX: 3,
      themeShadowOffsetY: 3,
      globalStyleId: CONSTANTS.globalStyleId,
    };
  }

  getButtonComponent(psuedoComponent) {
    return {
      id: this.componentMap[psuedoComponent.id].id,
      inTemplate: false,
      orderIndex: 1,
      wrap: false,
      mobileDown: false,
      onHover: null,
      kind: "BUTTON",
      left: psuedoComponent.left,
      top: psuedoComponent.top,
      width: psuedoComponent.width,
      height: psuedoComponent.height,
      relIn: {
        id: this.componentMap[psuedoComponent.parent],
        top:
          psuedoComponent.top -
          this.componentMap[psuedoComponent.parent].data.top,
        left:
          psuedoComponent.left -
          this.componentMap[psuedoComponent.parent].data.left,
        right: -250,
        bottom: -250,
      },
      relTo: null,
      relPage: null,
      relPara: null,
      text: psuedoComponent.text ? psuedoComponent.text : "Button",
      mobileHide: false,
      mobileSettings: {
        align: "justify",
      },
      style: getComponentStyle(psuedoComponent.style),
      linkAction: {},
      buttonThemeSelected: "primary",
    };
  }

  getImageComponent(psuedoComponent) {
    return {
      id: this.componentMap[psuedoComponent.id].id,
      inTemplate: false,
      orderIndex: 6,
      wrap: false,
      mobileDown: false,
      onHover: null,
      kind: "IMAGE",
      left: psuedoComponent.left,
      top: psuedoComponent.top,
      width: psuedoComponent.width,
      height: psuedoComponent.height,
      relIn: {
        id: this.componentMap[psuedoComponent.parent],
        top:
          psuedoComponent.top -
          this.componentMap[psuedoComponent.parent].data.top,
        left:
          psuedoComponent.left -
          this.componentMap[psuedoComponent.parent].data.left,
        right: -250,
        bottom: -250,
      },
      relTo: null,
      relPage: null,
      relPara: null,
      title: "",
      scale: psuedoComponent.scale,
      logoTitleScale: 1,
      rotation: 0,
      mobileHide: false,
      scaleStrategy: "crop",
      cropTop: 170,
      cropLeft: 0,
      asset: {
        alpha: null,
        animated: false,
        bpp: null,
        contentType: "image/jpeg",
        etag: '"17b373-5fc848a46a261"',
        filesize: 1553267,
        height: 2883,
        image: null,
        recommendedFormat: null,
        url: "repository:/design-universal-template-unsplash-vjlJBOedSWw.jpg",
        width: 1920,
      },
      style: null,
      linkAction: null,
      lightBoxEnabled: false,
      openLink: true,
      logoHorizontalAlignment: "left",
    };
  }

  getBoxComponent(psuedoComponent) {
    return {
      id: this.componentMap[psuedoComponent.id].id,
      kind: "BACKGROUND",
      top: psuedoComponent.top,
      left: psuedoComponent.left,
      width: psuedoComponent.width,
      height: psuedoComponent.height,
      orderIndex: 1,
      inTemplate: false,
      relTo: null,
      relIn: {
        id: this.componentMap[psuedoComponent.parent],
        top:
          psuedoComponent.top - this.componentMap[psuedoComponent.parent].top,
        left:
          psuedoComponent.left - this.componentMap[psuedoComponent.parent].left,
        right: -250,
        bottom: -250,
      },
      relPage: null,
      relPara: null,
      wrap: false,
      onHover: null,
      style: {
        background: {
          colorData: {
            color: ["HSL", ...rgbToHsla(pseudoComponent.style.backgroundColor)],
            gradient: null,
          },
          assetData: {
            opacity: 1,
            asset: {
              id: uuid(),
              type: "web.data.assets.Image",
              etag: "",
              url: "webspace:/onewebmedia/unsplash_cIwzPYs-_Mk.jpg",
              contentType: "",
              alpha: null,
              bpp: null,
              width: 4500,
              height: 4500,
              animated: false,
              recommendedFormat: null,
            },
            repeat: [true, true],
            overlay: "none",
            position: ["50%", "50%"],
            size: "contain",
            scrollEffect: null,
          },
        },
        border: {
          style: psuedoComponent.style.border,
          corners: getBorderRadius(psuedoComponent.style.borderRadius),
        },
      },
      mobileSettings: {
        size: "cover",
      },
      selectedTheme: "White",
    };
  }

  translate(componentJson) {
    let componentList = [];
    for (let i = 0; i < componentJson.length; i++) {
      switch (componentJson[i].type) {
        case "SECTION":
          componentList.push(this.getSectionComponent(componentJson[i]));
          break;
        case "TEXT":
          componentList.push(this.getTextComponent(componentJson[i]));
          break;
        case "BUTTON":
          componentList.push(this.getButtonComponent(componentJson[i]));
          break;
        case "IMAGE":
          componentList.push(this.getImageComponent(componentJson[i]));
          break;
        case "BACKGROUND":
          componentList.push(this.getBoxComponent(componentJson[i]));
          break;
      }
    }
    return componentList;
  }
}

const componentList = new WsbTranslator(pseudoJson);
console.log(componentList);

// need to check how we are recieving both text data and content data
// need to check what we are setting as border information and background color information
