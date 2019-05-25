//内嵌css
//wanna("page-1").style.cssText = 'background: black'
//内联css
//document.querySelector("style").sheet.cssRules.item(0).selectorText
//外联css和js的交互手段，但修改仅保存于运行时
//document.querySelector("link").sheet.cssRules.item(0).style.cssText = "visibility:hidden;" 工作的
//document.querySelector("link").sheet.cssRules.item(0).selectorText

let z = {
    /** @param {HTMLElement} element */
    setZ: function (element) {
        element.style.zIndex = Number(element.getAttribute('z'));
    },

    indexZ: function () {
        for (let index = 0; index < document.all.length; index++) {
            const element = document.all[index];
            if (document.all[index].hasAttribute('z')) {
                this.setZ(element);
            }
            if (document.all[index].hasAttribute('cover')) {
                this.cover(element);
            }
        }
    },

    /** 
     *  @param {HTMLElement} element
     */
    cover: function (element) {
        let thisZ = Number(element.getAttribute('z'));
        let finalZ = null;
        if (element.parentElement != null) {
            let Count = element.parentElement.childElementCount;
            for (let index = 0; index < Count; index++) {
                const elementNow = element.parentElement.children[index];
                if (elementNow.style.zIndex) {
                    finalZ += Number(elementNow.style.zIndex);
                }
                if (elementNow.getAttribute('z')) {
                    finalZ += Number(elementNow.getAttribute('z'));
                }
            }
        }
        if (finalZ) {
            finalZ += 1
            element.style.zIndex = thisZ + finalZ;
            // console.log(element);
            // console.log(element.parentElement);
            // console.log(finalZ);
            finalZ = null;
        }
    },

    callback: function (mutationList, observer) {
        mutationList.forEach((mutation) => {
            switch (mutation.type) {
                case 'attributes':
                    switch (mutation.attributeName) {
                        case "z":
                            z.indexZ();
                            break;
                        case "cover":
                            z.indexZ();
                            break;
                        case "style":
                            break;
                    }
                    break;
            }
        });
    }
}

function htmlVisiy() {
    wanna("html").style.visibility = 'visible';
}

let observer = new MutationObserver(z.callback);
wanna("html").addEventListener('loadstart', z.indexZ());
observer.observe(wanna("html"), {
    childList: true,
    subtree: true,
    attributeFilter: ["z", "style", "cover"]
});
