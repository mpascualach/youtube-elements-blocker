var iframes = document.querySelectorAll('iframe');

iframes.forEach(iframe => {
    const iframeHTML = iframe.outerHTML;
    console.log("Iframe outerHTML: ", iframeHTML);
})
// console.log(iframes.length);