const logoImage = api.showImage("tutorial/logo2.png", {
  animation: {
    name: "fadein",
    options: {
      duration: 3000
    }
  }
}, false);

api.wait(1000);

api.removeImage(logoImage.id, {
  animation: {
    name: "fadeout",
    options: {
      duration: 1500
    }
  }
}, false);


var title = api.showSubtitle(
  "Powered by[br] [c=yellow][s=30]AVGPlus Studio[/s][/c]",
  {
    position: "center",
    animation: {
      name: "flyin",
      options: {
        offset: 50,
        direction: "up",
        duration: 4000
      }
    }
  },
  false
);

api.wait(1000);
api.removeSubtitle(
  title.id,
  {
    animation: {
      name: "fadeout",
      options: {
        duration: 2000
      }
    }
  },
  false
);