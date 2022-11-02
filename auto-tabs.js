"use strict";
class Tabs {
    constructor(config) {
        this.config = config;
        this.init();
    }
    static intervalID;
    init() {
        if(!this.validate()) return;
        this.openTabsOnClick();
        this.autoChange();
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
                clearInterval(Tabs.intervalID);
                var dataTab = this.dataset.tab;
                that.contentChange(dataTab);
                that.autoChange();
            });
        }
    }
    contentChange(e) {
        var singleTabElement = document.querySelector('[data-tab="'+e+'"]');
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
        
        Tabs.intervalID = setInterval(function() {
            if(counter >= that.getItems().allTabs.length) {
                counter = 0;
            }
            that.contentChange(that.getItems().allTabs[counter].dataset.tab);
            counter++;
        }, timer);
    }
}