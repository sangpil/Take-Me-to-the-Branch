import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  var t = PROSketchBootstrap.documentKey(context.document);
  var projectId = t.split("/")[0];
  var branchId = t.split("/")[1];
  var branchName = t.split("/")[2];
  var fileId = t.split("/")[3];
  var commitId = t.split("/")[4];

  var url = "https://app.goabstract.com/projects/"+ projectId +"/branches/"+ branchId +"/commits/"+ commitId +"";
  var nsurl = NSURL.URLWithString(url);
  NSWorkspace.sharedWorkspace().openURL(nsurl);

  sketch.UI.message('go to '+ nameOfBranch);
}
