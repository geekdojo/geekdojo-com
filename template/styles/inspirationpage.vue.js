Vue.component('image-map-annotation', {
  props: ['annotation'],
  template: `
  <div :id="annotation.id" class="linkDiv" :style="mainStyle">
    <i class="fad fa-circle" style="--fa-primary-color:#fff; --fa-secondary-color:#000;"></i>
    <div :id="textId" class='linkText' :style="textStyle">
      <div class="annotationWrap">{{annotation.text}}</div>
    </div>
  </div>
  `,
  computed: {
    mainStyle() {
      return {
        top: this.annotation.top + 'px',
        left: this.annotation.left + 'px'
      }
    },
    textId() {
      return this.annotation.id + '-text';
    },
    textStyle() {

      var imgHeight = 600;
      var imgWidth = 800;
      var popoverHeight = 80;
      var popoverWidth = 120;
      var padding = 10;
      var circleHeight = 20;
  
  
      // Default to centered left
      this.annotation.setTop = -1*(popoverHeight/2) + padding;
      this.annotation.setLeft = (circleHeight + padding);
  
      // Open right if needed
      if(imgWidth <= this.annotation.left + popoverWidth + padding + circleHeight) {
        this.annotation.setLeft = -1 * (circleHeight + popoverWidth + padding);
      }
  
      // Open Bottom if needed
      if(0 > (this.annotation.top - ((popoverHeight/2) + padding))) {
          this.annotation.setTop = circleHeight + padding;
          this.annotation.setLeft = -1*(popoverWidth/2) + padding;
  
          // Shift to right-bottom 45 degrees if needed
          if(0 > this.annotation.left - (popoverWidth/2)) {
            this.annotation.setLeft = circleHeight;
          }
  
          // Shift to left-bottom 45 degrees if needed
          if(imgWidth < this.annotation.left + (popoverWidth/2)) {
            this.annotation.setLeft = -1*(padding + popoverWidth);
          }
      }
  
      // Open Top if needed
      if(imgHeight < (this.annotation.top + popoverHeight + padding)) {
        this.annotation.setTop = -1 * (popoverHeight + padding);
        this.annotation.setLeft = -1*(popoverWidth/2) + padding;
  
          // Shift to right-top 45 degrees if needed
          if(0 > this.annotation.left - (popoverWidth/2)) {
            this.annotation.setLeft = circleHeight + padding;
          }
  
          // Shift to left-top 45 degrees if needed
          if(imgWidth < this.annotation.left + (popoverWidth/2)) {
            this.annotation.setLeft = -1*(padding + popoverWidth);
          }
      }

      return {
        top: this.annotation.setTop + 'px',
        left: this.annotation.setLeft + 'px'
      }
    }
  }
})

Vue.component('image-map', {
  props: {
    'imageMapPath': {
      type: String,
      required: true
    }, 
    'imageMapDataPath': {
      type: String,
      required: true
    }
  },
  template: `
    <div>
      <img id="theImg" :src="imageMapPath" />
      <div>
        <image-map-annotation v-for="annotation in annotations" :key="annotation.id" :annotation="annotation"></image-map-annotation>
      </div>
    </div>
  `,
  data: function () {
    return {
      annotations: [{
        id: "link1",
        text: "Ultimaker 2+ Extended",
        top: 350,
        left: 140
      }, {
        id: "link2",
        text: "ThermalTake 850",
        top: 350,
        left: 680
      }, {
        id: "link3",
        text: "FigurePrint",
        top: 30,
        left: 560
    }, {
        id: "link4",
        text: "Carpet",
        top: 570,
        left: 400
    }, {
        id: "link5",
        text: "Top Left",
        top: 20,
        left: 30
    }, {
        id: "link6",
        text: "Top Right",
        top: 20,
        left: 770
    }, {
        id: "link7",
        text: "Bottom Right",
        top: 570,
        left: 770
    }, {
        id: "link8",
        text: "Bottom Left",
        top: 570,
        left: 30
    }]
    }
  }
})

var app = new Vue({
    el: '#inspirationApp',
    data: {}
  })