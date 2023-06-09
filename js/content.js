const youtubeElementsToBlock = [
    '.ytp-endscreen-content', // might be worth it to replace the content in this class with something interactible? not sure what though...
    `[aria-label="${'Shorts'}"]`, // cause I hate youtube shorts
    '.ytd-feed-filter-chip-bar-renderer', // don't tell me which categories are fit for me youtube
    `[title="${'Shorts'}"]`
    // I'll be adding more classes to block here
];

const additionalTargetId = 'contents' // the 'suggestions' page that youtube serves up for you
const targetUrl = 'https://www.youtube.com/' // where the 'suggestions' come from

const tagsToDisable = [
    'ytd-reel-shelf-renderer' // youtube really likes to promote its shorts on your average search results page
]

const blockYoutubeElements = () => {
    youtubeElementsToBlock.forEach(selector => { // with reference to 'classes' to target
        const blockedElements = document.querySelectorAll(selector);
    
        blockedElements.forEach(element => {
            element.style.display = 'none'; // this is how you 'hide' an element from view while on a page
        })
    });

    if (window.location.href == targetUrl) { // going into a specific page to disable elements there
        const additionalTargetElement = document.querySelector(`#${additionalTargetId}`);

        if (additionalTargetElement) {
            additionalTargetElement.style.display = 'none';
        }
    }

    tagsToDisable.forEach(tag => { // iterating over tags to disable 
        const elementsToDisable = document.getElementsByTagName(tag);

        for (let i = 0; i < elementsToDisable.length; i++) {
            elementsToDisable[i].style.display = 'none';
            // console.log(elementsToDisable[i].style.display)
        }
    })

    const iframes = document.querySelectorAll('iframe');

    for (let i = 0; i < iframes.length; i++) {
        //check if the iframe's url is equal to youtube.com
        if (iframes[i].src.includes('/embed/')) {
            console.log(iframes[i].src);
            iframes[i].setAttribute('style', 'display:block; background: black;');
        }
    }
}



blockYoutubeElements();
// trigger blockYoutubeElements whenever there are changes in the DOM
const observer = new MutationObserver(blockYoutubeElements);

const observerConfig = {
    childList: true, // observe changes of direct children of targeted node
    subtree: true
}

observer.observe(document, observerConfig)
