(function() {

    var checkExistsDiv = setInterval(function() {

        var div = document.querySelector("div[interaction-mode] > div");
        if (div) {
            createDivObserver();
            clearInterval(checkExistsDiv);
        }
     }, 100);

})();

function createDivObserver() {
    var dom_observer = new MutationObserver(function(mutation) {
        var speedControllerParent = document.querySelector(".vsc-controller");
        if (speedControllerParent) {
            attachSpeedSliderToVideoPlayerButton();
        }
    });
    var container = document.querySelector("div[interaction-mode] > div");
    var config = { attributes: true, childList: true, characterData: true };
    dom_observer.observe(container, config);
}

function attachSpeedSliderToVideoPlayerButton() {
    var speedController = document.querySelector(".vsc-controller").shadowRoot.querySelector("span.draggable");
    var observer = new MutationObserver(function(e) {
        var num = e[0].target.innerText;
        // Matches range on PluralSight's speed slider
        if (num >= 0.5 && num <= 2.0) {
            document.querySelector("button[aria-label='" + Number(num)+ "']").click();
        }
    });

    observer.observe(speedController, {
        characterData: true,
        childList: true
    });
}
