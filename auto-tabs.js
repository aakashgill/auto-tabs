"use strict";
class Tabs {
    constructor(config) {
        this.config = config;
        this.intervalID = config;
        this.init();
    }
    init() {
        if(!this.validate()) return;
        this.openTabsOnClick();
        this.autoChange();
        if(this.config.loading) {
            this.loader();
        }
        if(this.config.loadingColor) {
            this.changeLoaderColor();
        }
    }
    validate() {
        if (!(this.config && this.config.el)) {
            console.error('Tabs: Please provide an el to initialize tabs');
            return false;
        }
        if(!document.querySelector(this.config.el)) {
            console.error(`Tabs: Couldn't find an element with ID ${this.config.el}`);
            return false;
        }
        if(typeof this.config.timer == "string") {
            console.error('Tabs: Timer option must be a number');
            return false;
        }
        if(typeof this.config.autoplay == "string") {
            console.error('Tabs: autoplay option must be a boolean')
            return false;
        }
        if(typeof this.config.loading == "string") {
            console.error('Tabs: loading option must be a boolean')
            return false;
        }
        return true;
    }
    getItems() {
        var mainContainer = document.querySelector(this.config.el);
        return {
            mainContainer,
            allTabs: mainContainer.querySelectorAll(".tabs-container [data-tab]"),
            allTabsContent: mainContainer.querySelectorAll('.tabs-content-container .tab-content')
        }    
    }
    openTabsOnClick() {
        for(let i = 0; i < this.getItems().allTabs.length; i++) {
            var that = this;
            this.getItems().allTabs[i].addEventListener('click', function() {
                
                clearInterval(that.intervalID);
                var dataTab = this.dataset.tab;
                that.contentChange(dataTab);
                that.autoChange();
            });
        }
    }
    contentChange(e) {
        var singleTabElement = this.getItems().mainContainer.querySelector('[data-tab="'+e+'"]');
        var singleTabContent = this.getItems().mainContainer.querySelector(`[data-tab-content=${e}]`);

        this.getItems().allTabs.forEach(function(tab){
            tab.classList.remove('active-tab');
        })
        
        this.getItems().allTabsContent.forEach(function(tab){
            tab.classList.remove('active-tab');
        })

        singleTabElement.classList.add('active-tab');
        singleTabContent.classList.add('active-tab');
    }
    changeLoaderColor() {
        var that = this;
        this.getItems().allTabs.forEach(function(tab) {
            tab.querySelectorAll('.tabs--loader').forEach(function(tabsLoader) {
                tabsLoader.style.background = that.config.loadingColor;
            })
        })
    }
    loader() {
        var timer = this.config.timer || 2000;
        var loaderEl = `<span class="tabs--loader" style="animation-duration: ${timer}ms"></span>`;

        if(!this.getItems().allTabs[0].querySelector('.tabs--loader')) {
            this.getItems().allTabs[0].innerHTML += loaderEl;
        }
        
        this.getItems().allTabs.forEach(function(item) {
            if(item.querySelector('.tabs--loader')) {
                item.querySelector('.tabs--loader').remove();
            }
            if(item.classList.contains('active-tab')) {
                item.style.position="relative";
                item.innerHTML += loaderEl;
            }
        })
    }
    autoChange() {
        if(this.config.autoplay == false) {
            return;
        }
        var that = this;
        var timer = this.config.timer || 2000;
        var counter = 0;

        this.getItems().allTabs.forEach(function(i, j) {
            if(i.classList.contains('active-tab')) {
                counter = j + 1;
            }
        })
        
        this.intervalID = setInterval(function() {
            if(counter >= that.getItems().allTabs.length) {
                counter = 0;
            }
            that.contentChange(that.getItems().allTabs[counter].dataset.tab);
            counter++;
            if(that.config.loading) {
                that.loader();
            }
            if(that.config.loadingColor) {
                that.changeLoaderColor();
            }
        }, timer);
    }
}