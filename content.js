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

    // blockElementsFromYoutubeIframe(); 
    waitForIframeToLoad();
}

const waitForIframeToLoad = () => {
    const iframeToTarget = document.querySelector('iframe[src^="https://www.redditmedia.com/mediaembed/"]');
    if (iframeToTarget) {
        const iframeDocument = iframeToTarget.contentDocument;
        if (iframeDocument) {
            const videoToTarget = iframeDocument.querySelector('#player');
            console.log("Video target: ", videoToTarget);
        }
    } else {
        setTimeout(waitForIframeToLoad, 1000);
    }
}

// const blockElementsFromYoutubeIframe = () => {
//     const iframeToYoutube = document.querySelector('iframe[src*="youtube.com"]');
    
//     console.log("Iframe?: ", iframeToYoutube);

//     if (iframeToYoutube) {
//         // console.log("Found iframe: ", iframeToYoutube);
//         const iframeDoc = iframeToYoube.contentDocument || iframeToYoutube.contentWindow.document;
//         const suggestedVideoWall = iframeDoc.querySelector('.ytp-endscreen-content');

//         if (suggestedVideoWall) {
//             suggestedVideoWall.style.display = 'none';
//         }
//     }
// }



blockYoutubeElements();
// trigger blockYoutubeElements whenever there are changes in the DOM
const observer = new MutationObserver(blockYoutubeElements);

const observerConfig = {
    childList: true, // observe changes of direct children of targeted node
    subtree: true
}

observer.observe(document, observerConfig)
