/**
 * Services in charge of removing/adding records 
 */
ngAppModule.service('appService', function ($http) {    
    // Delete option function
    var deleteFormOption = function (itemId, callback) {
        // Here is where you're supposed to
        // implement your service to delete items from your database
        return callback(null);
        
    }; // End deleteFormOption    

    // Make them visible
    return {
        deleteFormOption: deleteFormOption        
    };

});