import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  var bootstrapInfo = PROSketchBootstrap.documentKey(context.document);
  var projectId = bootstrapInfo.split("/")[0];
  var branchId = bootstrapInfo.split("/")[1];
  var branchName = bootstrapInfo.split("/")[2];
  var fileId = bootstrapInfo.split("/")[3];
  var commitId = bootstrapInfo.split("/")[4];
  var targetObject = context.selection.firstObject();
  var layerId = null;

  if(targetObject != null && bootstrapInfo != null){
    if(targetObject.isKindOfClass(MSArtboardGroup) && targetObject.class() != "MSSymbolMaster"){
      layerId = targetObject.objectID();
      var url = "https://app.goabstract.com/projects/"+ projectId +"/branches/"+ branchId +"/commits/"+ commitId +"/files/"+ fileId +"/layers/"+ layerId +"?mode=design";
      openURL(url, branchName);
    }else if(targetObject.isKindOfClass(MSSymbolMaster) && targetObject.class() == "MSSymbolMaster"){
      layerId = targetObject.symbolID();
      var url = "https://app.goabstract.com/projects/"+ projectId +"/branches/"+ branchId +"/commits/"+ commitId +"/files/"+ fileId +"/layers/"+ layerId +"?mode=design";
      openURL(url, branchName);
    }else if(targetObject.isKindOfClass(MSSymbolInstance)){
      layerId = targetObject.symbolID();
      var url = "https://app.goabstract.com/projects/"+ projectId +"/branches/"+ branchId +"/commits/"+ commitId +"/files/"+ fileId +"/layers/"+ layerId +"?mode=design";
      openURL(url, branchName);
    }else if(targetObject.isKindOfClass(MSSliceLayer)){
      layerId = targetObject.objectID();
      var url = "https://app.goabstract.com/projects/"+ projectId +"/branches/"+ branchId +"/commits/"+ commitId +"/files/"+ fileId +"/layers/"+ layerId +"?mode=design";
      openURL(url, branchName);
    }else{
      sketch.UI.message('Please select an artboard');
    }
  }else{
    sketch.UI.message('Please select an artboard');
  }
}

function openURL(url, nameOfBranch){
  if(nameOfBranch == null) { nameOfBranch = 'Somewhere'; }
  var nsurl = NSURL.URLWithString(url);
  NSWorkspace.sharedWorkspace().openURL(nsurl);
  sketch.UI.message('go to '+ nameOfBranch);
}
