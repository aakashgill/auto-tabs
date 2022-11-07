# Auto tabs

A simple tabs switcher with an autoplay feature
1. Support for multiple instances of tabs
2. Support of setting the autoplay timer
3. Support of line-loading animation and changing its color


## Get started by adding the
### Markup
``` HTML
<div id="tabs">
    <div class="tabs-container">
        <button data-tab="tab1" class="tabs active-tab">
            Tab 1
        </button>
        <button data-tab="tab2" class="tabs">
            Tab 2
        </button>
        <button data-tab="tab3" class="tabs">
            Tab 3
        </button>
        <button data-tab="tab4" class="tabs">
            Tab 4
        </button>
    </div>
    <div class="tabs-content-container">
        <div class="tab-content active-tab" data-tab-content="tab1">
            Tab 1 data
        </div>
        <div class="tab-content" data-tab-content="tab2">
            Tab 2 data
        </div>
        <div class="tab-content" data-tab-content="tab3">
            Tab 3 data
        </div>
        <div class="tab-content" data-tab-content="tab4">
            Tab 4 data
        </div>
    </div>
</div>
```

### CSS
``` CSS
.tabs-content-container .tab-content {
    display: none;
}
.tabs-content-container .tab-content.active-tab {
    display: block;
}
.tabs--loader {
    width: 100%;
    height: 1px;
    background-color: black;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: left;
}
.tabs-container .tabs.active-tab .tabs--loader {
    animation-name: line-loader;
    animation-timing-function: linear;
}
@keyframes line-loader {
    to {
        transform: scaleX(1);
    }
}
 /* Basic tabs styling */
#tabs {
    max-width: 500px;
    margin: 50px auto;
    border: 1px solid #d9dee1;
}
.tabs-container {
    display: flex;
}
.tabs {
    flex-grow: 1;
    text-align: left;
    padding: 10px;
    background: #eee;
    cursor: pointer;
    border: none;
    border-radius: 3px;
}
.tabs-content-container {
    padding: 10px;
}
.tabs-container .tabs.active-tab {
    background-color: #fff;
    font-weight: 600;
}
```

### JS
``` HTML
<script src="path_goes_here/auto-tabs.js"></script>
<script>
    new Tabs({
        el: '#tabs'
    });
</script>
```


## Options
| Name | Value | Default Value | Optional | ValueType |
| --- | --- | --- | --- | --- |
| autoplay | true/false | true | yes | Boolean |
| timer | 1000 | 2000 | yes | Number |
| loading | true/false | false | yes | Boolean |
| loadingColor | 'hex-value or color-name' | black | yes | String |


### For example
```JS
new Tabs({
    el: '#tabs',
    autoplay: false
});
```

### Demo
[Checkout the demo here](https://aakashgill.github.io/auto-tabs/)