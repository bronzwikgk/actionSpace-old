/**
 * @type {HTMLJSONEntityModel4Html}
 */
var entityModel4Html = {
    tagName: "tagName",
    attributes: { class: "class", style: "style", src: "src", alt: "alt" },
    children: ["all"],
};


var newActionStoryRequest = {
    flowRequest:[
        {
            reqName:"Save",
            objectModel:engine,
            method:'processReq',
            arguments:[saveFileFlowRequest]
        },
        {
            reqName:'RecentFiles',
            objectModel:engine,
            method:'processReq',
            arguments:[recentFilesFlowRequest]
        },
        {
            reqName:"New",
            objectModel:engine,
            method:'processReq',
            arguments:[newFileFlowRequest]
        }
    ]
}
