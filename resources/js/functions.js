$("#send").click(function(){
    swal({   
        title: "Se enviara la solicitud con los datos ingresados, quiere continuar?",   
        text: "Enviar solicitud",   
        type: "info",   
        showCancelButton: true,   
        closeOnConfirm: false,   
        showLoaderOnConfirm: true, 
        }, function(){   
            setTimeout(function(){     
                swal({
                    "title" : "Solicitud enviada",
                    "text" : "Solicitud enviada con exito!",
                    "type" : "success"
                });   
            }, 2000); 
        });    
});

function send(){    
    swal({   
        title: "Se enviara la solicitud con los datos ingresados, quiere continuar?",   
        text: "Enviar solicitud",   
        type: "info",   
        showCancelButton: true,   
        closeOnConfirm: false,   
        showLoaderOnConfirm: true, 
        }, function(){   
            setTimeout(function(){     
                swal({
                    "title" : "Solicitud enviada",
                    "text" : "Solicitud enviada con exito!",
                    "type" : "success"
                });   
            }, 2000); 
        });    
    
}
