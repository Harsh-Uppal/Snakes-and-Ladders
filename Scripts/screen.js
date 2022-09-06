const ScreenManager = {
    activeScreen: null,
    screenChangeTransition: null,
    transitioning: false,
    screenTree: [],
    goBack: () => {
        ScreenManager.screenTree.pop();
        ScreenManager.screenTree[ScreenManager.screenTree.length - 1].enable(false);
    }
}

class Screen {
    constructor(elementId, onload) {
        this.element = document.getElementById(elementId);
        this.element.style.display = 'none';

        if (onload != null)
            this.onload = onload;
    }

    enable = (addToScreenTree = true) => {
        if (ScreenManager.transitioning)
            return;

        if (addToScreenTree)
            ScreenManager.screenTree.push(this);

        const changeScreen = () => {
            if (ScreenManager.activeScreen)
                ScreenManager.activeScreen.disable();

            this.element.style.display = '';
            ScreenManager.activeScreen = this;

            if (this.onload)
                this.onload();
        };

        if (ScreenManager.screenChangeTransition)
            ScreenManager.screenChangeTransition.start(changeScreen);
        else
            changeScreen();
    }

    disable = () => {
        this.element.style.display = 'none';
    }
}

class Transition {
    constructor(cssAnimationName, animationNodeId, duration) {
        this.animationName = cssAnimationName;
        this.animationNode = document.getElementById(animationNodeId);
        this.duration = duration;
    }

    start(onhalfway = null, onend = null) {
        ScreenManager.transitioning = true;

        if (typeof (onhalfway) == 'function')
            setTimeout(onhalfway, this.duration / 3);
        setTimeout(() => {
            if (typeof (onend) == 'function')
                onend();
            this.animationNode.style.animation = '';
            ScreenManager.transitioning = false;
        }, this.duration);

        this.animationNode.style.animation = `${this.animationName} ${this.duration}ms forwards`;
    }
}