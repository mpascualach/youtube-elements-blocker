const youtubeElementsToBlock = [
    '.ytp-endscreen-content',
    `[aria-label="${'Shorts'}"]`,
    '.ytd-feed-filter-chip-bar-renderer'
];

const additionalTargetId = 'contents'
const targetUrl = 'https://www.youtube.com/'

const tagsToDisable = [
    'ytd-reel-shelf-renderer'
]

const blockYoutubeElements = () => {
    youtubeElementsToBlock.forEach(selector => {
        const blockedElements = document.querySelectorAll(selector);
    
        blockedElements.forEach(selector => {
            selector.style.display = 'none';
        })

        const elementsWithAriaLabel = Array.from(blockedElements).filter(element => element.getAttribute('aria-label'));
    });

    if (window.location.href == targetUrl) {
        const additionalTargetElement = document.querySelector(`#${additionalTargetId}`);

        if (additionalTargetElement) {
            additionalTargetElement.style.display = 'none';
        }
    }

    tagsToDisable.forEach(tag => {
        const elementsToDisable = document.getElementsByTagName(tag);

        for (let i = 0; i < elementsToDisable.length; i++) {
            console.log("Disabling this element: ", elementsToDisable[i]);
            elementsToDisable[i].style.display = 'none';
            // console.log(elementsToDisable[i].style.display)
        }
    })
}

blockYoutubeElements();

// trigger blockYoutubeElements whenever there are changes in the DOM
const observer = new MutationObserver(blockYoutubeElements);

const observerConfig = {
    childList: true, // observe changes of direct children of targeted node
    subtree: true
}

observer.observe(document, observerConfig)
