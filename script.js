class Tabs {
    constructor(config) {
        this.config = config;
        this.mainContainer;
        this.btnElements;
        this.init();
    }

    init() {
        this.validate();
        this.getElements();
        this.openTabsOnClick();
    }

    validate() {
        if (!(this.config && this.config.el)) {
            console.error('Please provide an element to initialize tabs');
            return false;
        }
    }

    getElements() {
        this.mainContainer = document.querySelector(this.config.el);
        this.btnElements = this.mainContainer.querySelectorAll(".tabs-container [data-tab]");
    }
    
    openTabsOnClick() {
        for(let i = 0; i < this.btnElements.length; i++) {
            var that = this;
            this.btnElements[i].addEventListener('click', function() {
                var dataTab = this.dataset.tab;
                that.contentChange(dataTab);
            });
        }
    }

    contentChange(e) {
        var singleTabElement = document.querySelector('[data-tab="'+e+'"]');
        var contentBox = singleTabElement.parentElement;
        for (let sibling of contentBox.children) {
            sibling.classList.remove('active-tab');
        }
        singleTabElement.classList.add('active-tab');
        var allContent =  this.mainContainer.querySelectorAll('.tabs-content-container .tab-content');
        for (let i = 0; i < allContent.length; i++) {
            allContent[i].classList.remove('active-tab');
        }
        var singleTabContent = this.mainContainer.querySelectorAll('.tabs-content-container .tab-content#'+e);
        singleTabContent[0].classList.add('active-tab');
    };
}

// export 
var a = new Tabs({
    el: '#tabs'
});