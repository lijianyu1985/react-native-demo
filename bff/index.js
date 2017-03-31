
var Hapi = require('hapi');
var fs = require('fs');
var lodash = require('lodash');

const server = new Hapi.Server();

server.connection({
        "host": "0.0.0.0",
        "port": 3003,
        "routes": {
            "cors": true
        },
        "router": {
            "isCaseSensitive": false,
            "stripTrailingSlash": false
        }
    });

var attachments=[
    
];

server.route([
    {
    method: 'GET',
    path: '/attachments',
    handler: function (request, reply) {
        reply(attachments);
    }
},
    {
    method: 'DELETE',
    path: '/attachment',
    handler: function (request, reply) {
        var fileName = request.query.fileName;
        lodash.remove(attachments, function(n) {
            return n.fileName === fileName;
        });
        reply(attachments);
    }
},{
    method: 'PUT',
    path: '/attachment',
    handler: function (request, reply) {
        if (request.payload.file) {
                var name = request.payload.fileName;
                var path = __dirname + "/uploads/" + name;
                var file = fs.createWriteStream(path);

                file.on('error', function (err) { 
                    console.error(err) 
                });
                file.write(request.payload.file);
            }

        var attachment = request.payload;
        delete attachment.file;
        attachment.filePath='...';
        attachments.push(attachment);
        reply(attachments);
    }
}
]);


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});


