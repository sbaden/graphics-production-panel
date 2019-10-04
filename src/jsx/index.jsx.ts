#include './json2.jsx'


function getTargetFolders(targetDirectory){
    var folder = new Folder (targetDirectory);
    var items = folder.getFiles();
    var sortedFolders = [];
    items.sort();

    for(i=0; i< items.length; i++){
        var fileToString = items[i].toString();
        var fileName = decodeURI(items[i].name);
      
        if (fileToString.indexOf(".DS_Store") < 0){
            if(items[i] instanceof Folder){
                sortedFolders.push(fileName);
            }
        }
    }
    return JSON.stringify(sortedFolders); 
}

function getTargetFiles(profile){
    var folder = new Folder (profile.showDirectory + profile.show + '/');
    var files = folder.getFiles();
    var sortedFiles = [];
    files.sort();

    for(i=0; i< files.length; i++){
        // var fileToString = files[i].toString();
        var fileName = decodeURI(files[i].name);

        if (fileName.match(/\.(js|jsx|jsxbin)$/)){ // Removes all files that are not script files from the array
            sortedFiles.push(fileName.substring(0, fileName.lastIndexOf('.')));
        }
    }

    return JSON.stringify(sortedFiles);
}

function returnDirectory(){
	var targetDirectory = Folder.selectDialog();  // Select a folder
                
    if (targetDirectory != null){  // Verify folder was selected
        directory = decodeURI(targetDirectory.fsName);  // Convert folder path to readable text
        
        return directory;
    }
}

function returnFile(){
    var targetFile = File.openDialog('Select a CSV',function(file){
        if (file instanceof Folder){
            return true;
        }
        else{
            return file.name.match(/\.csv$/i) != null;
        }
    });  // Select a file
                
    if (targetFile != null){  // Verify file was selected
        directory = decodeURI(targetFile.fsName);  // Convert file path to readable text
        return directory;
    }
}

function verifyDirectory(directory) {
    var folder = new Folder(directory);

    return folder.exists ? true : false;
}

function submit(profile){
    var result = {};

    if(verifyDirectory(profile.jsonProfileUIRepo)){
        var scriptLocation = profile.showDirectory + profile.show + '/' + profile.script + '.jsx';
        var scriptFile = new File(scriptLocation);

        // WRITE A JSON FILE TO PASS TO SHOW-SCRIPT FILE
        writeJSON(profile);

        // RUN SHOW SCRIPT
        if(scriptFile.exists){
            $.evalFile(scriptLocation);
            
            ///////////// RETURN SUCCESS FOR SNACKBAR
            result.variant = 'success';
            result.message = 'Batch Complete';
            return JSON.stringify(result);
        }
        else{
            ///////////// RETURN ERROR FOR SNACKBAR
            result.variant = 'error';
            result.message = 'Project was not found';
            return JSON.stringify(result);
        }
    }
    else{
        ///////////// RETURN ERROR FOR SNACKBAR
        result.variant = 'error';
        result.message = 'Profile repo not found';
        return JSON.stringify(result);
    }
}

function writeJSON(profile){
    var newFile = new File(profile.jsonProfileUIRepo + "ae_panel_profile" + ".json");  // DEFINE FILE PATH AND NAME

    if (newFile != null) {
        newFile.open("w","TEXT","????");

        newFile.write(JSON.stringify(profile));
    
        newFile.close();
        // newFile.execute();  // Open log
    }
}
