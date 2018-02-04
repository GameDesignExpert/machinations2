
nw.Window.open('index.html', {}, function(win) {
  win.enterFullscreen();

  nw.App.registerGlobalHotKey(new nw.Shortcut({
    key: "Escape",
    active: function () {
        win.leaveFullscreen();
    }
  }));

});
