    
var app = angular.module('App', []); 

var params = {};

var SCP = 1.0603;
var TIMV = 0.0105;
var SMMN = 667;
var TNA = TIMV * 12;
Number.prototype.format = function(n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
                    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
                    };
Object.defineProperty(params, "COMPANIES",{
  enumerable : true,
  configurable :  false,
  writable : false,
  value : [
    'Porvenir',
    'Studio F',
    'Emcali - Admon',
    'Emcali - Pensionados',
    'Emcali - Sindicato'
  ]
});

Object.defineProperty(params, 'USERS', {
   enumerable: true,
   configurable : false,
   writable : false,
   value : {
        "1144044549" : {
            "resp" : [
                {
                    "type" : "TC",
                    "amount" : 450000,
                    "bank" : "DAVIVIENDA"
                },
                {
                    "type" : "CP",
                    "amount" : 320000,
                    "bank" : "POPULAR"
                } 
            ]
        },
        "1144044548" : {
            "resp" : [
                {
                    "type" : "TC",
                    "amount" : 180000,
                    "bank" : "DAVIVIENDA"
                },
                {
                    "type" : "CP",
                    "amount" : 35000,
                    "bank" : "POPULAR"
                } 
            ]
        },
        "1144044547" : {
            "resp" : [
                {
                    "type" : "TC",
                    "amount" : 45000,
                    "bank" : "DAVIVIENDA"
                },
                {
                    "type" : "CP",
                    "amount" : 320000,
                    "bank" : "POPULAR"
                } 
            ]
        },
   }

});

Object.defineProperty(params, 'MONTHS', {
    enumerable : true,
    configurable : false,
    writable : false,
    value : {
        "1" : [
            {"value" : 6} ,  
            {"value": 9}, 
            {"value":12}, 
            {"value" : 18} , 
            {"value" :24}, 
            {"value" : 30},  
            {"value":36}
        ],
        "2" : [
            {"value" : 6},
            {"value" : 9}, 
            {"value" :12}, 
            {"value" : 18}, 
            {"value" : 24}, 
            {"value" : 30}, 
            {"value" :36 }, 
            {"value" : 48}
        ],
        "3" : [
            {"value" : 6}, 
            {"value" : 9}, 
            {"value" : 12}, 
            {"value" : 18}, 
            {"value" : 24}, 
            {"value" : 30}, 
            {"value" : 36}, 
            {"value" : 48}, 
            {"value" :60 }, 
            {"value" :72}
        ],
        "4" : [
            {"value" :6}, 
            {"value" :9}, 
            {"value" :12}, 
            {"value" :18}, 
            {"value" :24}, 
            {"value" :30}, 
            {"value" : 36}, 
            {"value" : 48}, 
            {"value" :60}, 
            {"value" : 72}, 
            {"value" : 84}, 
            {"value" :96}
        ],
    
    }
});

Object.defineProperty(params, 'MIN', {
   enumerable : true,
   configurable : false,
   writable : false,
   value :  689454
});
var AMOUNTH_0 = 500000;
var AMOUNTH_1 = 7500000;
var AMOUNTH_2 = 10000000;
var AMOUNTH_3 = 50000000;
var AMOUNTH_4 = 120000000;


app.run(function($rootScope, $location) {                          
});

app.controller("simulator", function($scope){
    $scope.vc = 0;
    $scope.min_amounth = AMOUNTH_0;
    $scope.max_amounth = AMOUNTH_4;
    $scope.companies = params.COMPANIES;// SCOPE FOR COMPANIES
    $scope.cuota_sin_seguro = 0;
    $scope.months = {}; // SCOPE FOR MONTHS
    $scope.$watch("month", function(_new, _old){
    })
    $scope.$watch("amountRequired", function(_new, _old){ // Watch for amoount required:
        $scope.errorAmounth = false; // Scope for amount fail
        if( _new >= AMOUNTH_0 && _new < AMOUNTH_1){
            $scope.months.data = params.MONTHS["1"];
        }else if(_new > AMOUNTH_1 && _new < AMOUNTH_2){
            $scope.months.data = params.MONTHS["2"];
        }else if(_new >= AMOUNTH_2 && _new < AMOUNTH_3){
            $scope.months.data = params.MONTHS["3"];
        }else if(_new >= AMOUNTH_3 && _new < AMOUNTH_4){
            $scope.months.data = params.MONTHS["4"];
        }else{
            $scope.errorAmounth = true;
        }
        months = $scope.months;
        try{
            $scope.cuota_sin_seguro = Math.round($scope.amountRequired * ((TIMV * (Math.pow((1+TIMV), $scope.month.value ))) / (Math.pow((1 + TIMV), $scope.month.value ) -1)));
        }catch(err){
        }
        if($scope.seguro == 2){
            $scope.cuota_sin_seguro = parseInt($scope.cuota_sin_seguro).format();
        }else{
            
            $scope.cuota_sin_seguro = (parseInt($scope.cuota_sin_seguro) * SCP ).format();
        }

    });
    $scope.$watch("vc", function(_new, _old){
        $scope.disponible_1 = $scope.salario - $scope.gastos_familiares - $scope.tq + _new;
        $scope.disponible_2 = $scope.salario = $scope.proteccion_salarial - $scope.descuentos;
        


    })
    $scope.disponible_1 = null;
    $scope.disponible_2 = null;
    $scope.$watch("seguro", function(_new, _old){
        try{
            $scope.cuota_sin_seguro = Math.round($scope.amountRequired * ((TIMV * (Math.pow((1+TIMV), $scope.month.value ))) / (Math.pow((1 + TIMV), $scope.month.value ) -1)));
        }catch(err){
        }
        if(_new == 1){
            $scope.cuota_sin_seguro = (parseInt($scope.cuota_sin_seguro) * SCP ).format();
        }else{
        
            $scope.cuota_sin_seguro = (parseInt($scope.cuota_sin_seguro)).format();
        }

    })
    $scope.gastos_familiares = null;
    $scope.$watch("salario", function(_new, _old){
        $scope.cantidad_minimos = _new/params.MIN;   
        if($scope.cantidad_minimos < 3){
            $scope.gastos_familiares = 0.5;    
        }else if(5 >= $scope.cantidad_minimos && $scope.cantidad_minimos >=3){
            $scope.gastos_familiares = 0.45;    
        }else if(10 >= $scope.cantidad_minimos && $scope.cantidad_minimos > 5){
            $scope.gastos_familiares = 0.40;
        }else if(20 >= $scope.cantidad_minimos && $scope.cantidad_minimos > 10){
            $scope.gastos_familiares = 0.35;
        }else if($scope.cantidad_minimos > 20){
            $scope.gastos_familiares = 0.30;    
        }
        $scope.gastos_familiares = parseFloat($scope.salario) * parseFloat($scope.gastos_familiares);
        $scope.tq = 0;
        $scope.$watch("tq", function(){
            console.log("tq: "+ $scope.tq);
        });
        $scope.proteccion_salarial = $scope.salario * 0.92 * 0.5;
        $scope.$watch("documento", function(_new,_old){
            if(params.USERS[_new]){
                $scope.deudas = params.USERS[_new].resp;
                resp = params.USERS[_new].resp;
                total = 0;
                for(deuda of resp){
                    total += deuda.amount;    
                }

                $scope.tq = total;
            }else{
                $scope.tq = 0;    
            }

            $scope.disponible_1 = $scope.salario - $scope.gastos_familiares - $scope.tq + $scope.vc;
        });
        try{
            $scope.cuota_sin_seguro = Math.round($scope.amountRequired * ((TIMV * (Math.pow((1+TIMV), $scope.month.value ))) / (Math.pow((1 + TIMV), $scope.month.value ) -1)));
        }catch(err){
        }

         if($scope.seguro == 2){
            $scope.cuota_sin_seguro = parseInt($scope.cuota_sin_seguro).format();
        }else{
            
            $scope.cuota_sin_seguro = (parseInt($scope.cuota_sin_seguro) * SCP ).format();
        }  
    });
    

});

app.controller('advanced', function($scope){
    $scope.options = [
        {
            "value" : 1,
            "name" : "Libre inversión"
        },
        {
            "value" : 2,
            "name" : "Compra de cartera"
        }
    ]
    $scope.min_amounth = AMOUNTH_0;
    $scope.max_amounth = AMOUNTH_4;
    $scope.months = {};
    $scope.$watch("monto_requerido", function(_new, _old){ // Watch for amoount required:
        $scope.errorAmounth = false; // Scope for amount fail
        if( _new >= AMOUNTH_0 && _new < AMOUNTH_1){
            $scope.months.data = params.MONTHS["1"];
        }else if(_new > AMOUNTH_1 && _new < AMOUNTH_2){
            $scope.months.data = params.MONTHS["2"];
        }else if(_new >= AMOUNTH_2 && _new < AMOUNTH_3){
            $scope.months.data = params.MONTHS["3"];
        }else if(_new >= AMOUNTH_3 && _new < AMOUNTH_4){
            $scope.months.data = params.MONTHS["4"];
        }else{
            $scope.errorAmounth = true;
        }
        months = $scope.months;
        try{
            $scope.cuota_sin_seguro = Math.round($scope.amountRequired * ((TIMV * (Math.pow((1+TIMV), $scope.month.value ))) / (Math.pow((1 + TIMV), $scope.month.value ) -1)));
        }catch(err){
        }
        if($scope.seguro == 2){
            $scope.cuota_sin_seguro = parseInt($scope.cuota_sin_seguro).format();
        }else{
            
            $scope.cuota_sin_seguro = (parseInt($scope.cuota_sin_seguro) * SCP ).format();
        }

    });

    $scope.vc = 0;
    $scope.$watch("tipo_credito", function(_new, _old){
    });
    $scope.$watchGroup(['monto_requerido', 'month', "tipo_credito", "seguro", "nombre", "apellido", "telefono", "documento", "salario", "descuento"], function(newValues, oldValues){
        if( $scope.monto_requerido
            && $scope.month 
            && $scope.tipo_credito 
            && $scope.seguro 
            && $scope.nombre 
            && $scope.apellido 
            && $scope.telefono 
            && $scope.documento 
            && $scope.salario
            && $scope.descuento){
            $scope.$watch("tipo_credito", function(){
                if($scope.tipo_credito.value == 1){
                    $scope.vc = 0;
                }else{
                    $scope.vc = $scope.vc_real ? $scope.vc_real : 0;
                }
            });
            $scope.proteccion_salarial = $scope.salario * 0.92 * 0.5; 
            $scope.cantidad_minimos = $scope.salario / params.MIN;
            $scope.valor_calculo_gastos = ($scope.cantidad_minimos < 3 ? 0.5 : ( $scope.cantidad_minimos >=3 && $scope.cantidad_minimos <= 5 ? 0.45 : ( $scope.cantidad_minimos > 5 && $scope.cantidad_minimos <= 10 ? 0.40 : ( $scope.cantidad_minimos >10 && $scope.cantidad_minimos <= 20 ? 0.35 : 0.3) ) ));
            $scope.gastos_familiares = $scope.salario * $scope.valor_calculo_gastos;
            aux = 0;
            for(val of params.USERS[$scope.documento].resp){
                aux += val.amount;    
            };
            $scope.deudas = params.USERS[$scope.documento].resp;
            $scope.tq = aux;
            $scope.disponible_2 = $scope.salario - $scope.proteccion_salarial - $scope.descuento;
            $scope.disponible_1 = $scope.salario - $scope.gastos_familiares - $scope.tq + $scope.vc;

            $scope.cuota = Math.round($scope.monto_requerido * ((TIMV * (Math.pow((1+TIMV), $scope.month.value ))) / (Math.pow((1 + TIMV), $scope.month.value ) -1)));
            $scope.min = $scope.disponible_2 < $scope.disponible_1 ? $scope.disponible_2 : $scope.disponible_1;


            $scope.addVC = function(value){
                if(this.confirm){
                    $scope.vc += value;
                }else{
                    $scope.vc -= value;
                }
                $scope.disponible_2 = $scope.salario - $scope.proteccion_salarial - $scope.descuento;
                $scope.disponible_1 = $scope.salario - $scope.gastos_familiares - $scope.tq + $scope.vc;

                $scope.min = $scope.disponible_2 < $scope.disponible_1 ? $scope.disponible_2 : $scope.disponible_1;
            }

            console.clear();

            $scope.$watch("vc", function(){
                if($scope.tipo_credito.value == 2){
                    $scope.vc_real = $scope.vc;
                }
                console.log("disponible 1 : " + $scope.disponible_1);

                console.log("disponible 2 : " + $scope.disponible_2);

                console.log("cuota : " + $scope.cuota);

                console.log("tq : " + $scope.tq);

                console.log("vc : "+ $scope.vc);
           
            })

            console.log("disponible 1 : " + $scope.disponible_1);

            console.log("disponible 2 : " + $scope.disponible_2);

            console.log("cuota : " + $scope.cuota);

            console.log("tq : " + $scope.tq);

            console.log("vc : "+ $scope.vc);
        }else{
        }
    });
})
