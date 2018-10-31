import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  run();
}

var bootstrapInfo;
var projectId;
var branchId;
var branchName;
var fileId;
var commitId;
var targetObject;
var layerId;
var urlString;

function run(){
  var lastInput = context.command.valueForKey_onDocument_forPluginIdentifier( "user_lastBranchID", context.document.documentData(), "com.sangpil.sketch" );
  bootstrapInfo = PROSketchBootstrap.documentKey(context.document);
  projectId = bootstrapInfo.split("/")[0];
  branchId = bootstrapInfo.split("/")[1];
  branchName = bootstrapInfo.split("/")[2];
  fileId = bootstrapInfo.split("/")[3];
  commitId = bootstrapInfo.split("/")[4];
  targetObject = context.selection.firstObject();
  layerId = null;

  if (targetObject != null && bootstrapInfo != null){
    if(targetObject.isKindOfClass(MSArtboardGroup) && targetObject.class() != "MSSymbolMaster"){
      layerId = targetObject.objectID();
    }else if(targetObject.isKindOfClass(MSSymbolMaster) && targetObject.class() == "MSSymbolMaster"){
      layerId = targetObject.symbolID();
    }else if(targetObject.isKindOfClass(MSSymbolInstance)){
      layerId = targetObject.symbolID();
    }else if(targetObject.isKindOfClass(MSSliceLayer)){
      layerId = targetObject.objectID();
    }else{
      sketch.UI.message('Please select an artboard');
    }

    var userInterface = COSAlertWindow.new();
    userInterface.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon-small.png").path()));
    userInterface.setMessageText("Go to specific branch");
    userInterface.setInformativeText("Please copy the Branch ID from Abstract");
  
    var artboardLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 300, 20))
    artboardLabel.setBezeled(true)
    artboardLabel.setDrawsBackground(true)
    artboardLabel.setEditable(true)
    artboardLabel.setSelectable(true)
    if (lastInput != null) {
      artboardLabel.setStringValue(lastInput);
    }else{
      artboardLabel.setStringValue('');
    }
    artboardLabel.setFont(NSFont.paletteFontOfSize(NSFont.systemFontSize()))
    userInterface.addAccessoryView(artboardLabel);
  
    userInterface.addButtonWithTitle('Close'); //1000
    userInterface.addButtonWithTitle('GO!'); //1001
    modalHandler(userInterface, userInterface.runModal());
  }else{
    sketch.UI.message('Please select an Artboard or Symbol.');
  }
}

function modalHandler(modal, action){
  switch (action) {
    case 1000: //close

        break;
      case 1001: //go!
        var specificBranchID = modal.viewAtIndex(0).stringValue();
        if (specificBranchID != nil && specificBranchID != '') {
          // log(branchID);
          // log("https://app.goabstract.com/projects/"+ projectId +"/branches/"+ branchId +"/commits/"+ commitId +"/files/"+ fileId +"/layers/"+ layerId +"?mode=design");
          context.command.setValue_forKey_onDocument_forPluginIdentifier(specificBranchID, "user_lastBranchID", context.document.documentData(), "com.sangpil.sketch" );
          urlString = "https://app.goabstract.com/projects/"+ projectId +"/branches/"+ specificBranchID +"/commits/"+ commitId +"/files/"+ fileId +"/layers/"+ layerId +"?mode=design";
          openURL(urlString);
        }
        
        break;
      case 1002: //close
        
        break;
      default:
  }
}

function openURL(url){
  var nsurl = NSURL.URLWithString(url);
  NSWorkspace.sharedWorkspace().openURL(nsurl);
}