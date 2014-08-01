$(document).ready(function(){


  var fx = "";
  var newfx = "";
  var exp = new Expression("");
  var hasilConvert = "";
  var hasilperhitungan=0;

function Convert(a)
{
    var frm = document.frmMain;
    var arrToks;
    var arrPFix;
    var strExp;
    var intCntr;

    strExp = a;
    if (strExp == null || strExp == undefined)
    {
        alert ("No expression is specified!");
        return false;
    }

    exp.Expression(strExp);
    hasilConvert = exp.Parse();
  
    //frm.txtResult.value = exp.Parse();
    return false;
}

function Compute()
{
    var frm;
    var strExp;

    strExp = hasilConvert;
    exp.Expression(strExp);
    hasilperhitungan = exp.Evaluate();
    
    return hasilperhitungan;
   // frm.txtResult.value = exp.Evaluate();
}

function Reset()
{
  exp.Reset();
}



  $("input").focus(function(){
       $(this).css("background-color","#cccccc");
    });
  
    $("input").blur(function(){
      $(this).css("background-color","#ffffff");
    });



    function changefx(fx,x){

      var fx2= "";
      //fx2 = fx.replace(/c/g,"$1 * c");
      fx2 = fx.replace(/(\d)\s*x/g,"$1 * x");
      fx2 = fx2.replace(/x/g,x); 

      return fx2;
      
    }

  $("#btnSubmit").click(function(){

    var n = $("#n").val();
    var hasil="";
    var fx = $("#fx").val();
    var tempfx = fx;
    var x1 = $("#x1").val();
    var x2 = $("#x2").val();
    var x = x1;
    var h = (x2-x1)/n;
    var i =0;
    var simp = new Array();
    
    for(i=0;i<4;i++) simp[i]=0;
    //$("p#hasilfx").html( "`F(X) = " + fx + ".`");


      if(n > 1 && n%2 ==0){ 
        $("p#hasilh").html("Solution:<br/>`h = ("+x2+"-"+x1+")/"+n+" = "+h+"`");
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"hasilh"]);

        $("p#hasilfx").html("`\int_{"+x1+"}^{"+x2+"} ("+fx+" ) dx approx I = "+h+"/3 [F("+x1+") + 4\sum_{i=1,3,5,...,n-1} F(X_i) + 2\sum_{i=2,4,6,...,n-2} F(X_i)+ F("+x2+")]`");
       
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"hasilfx"]);


        //i=0;
        //while(x<=x2)
        for(i=0;i<=n;i++){
          tempfx = fx;
          

          if(x==x1){
            newfx = changefx(tempfx,x1);
            Convert(newfx);
            simp[0]=Compute();

          } 

          else if(i==n){
            newfx = changefx(tempfx,x2);
            Convert(newfx);
            simp[3]=Compute();
          }

          else{

            if(i%2==0){
              //alert("genap");
              newfx = changefx(tempfx,x);
              Convert(newfx);
              simp[2]= simp[2] + 2*Compute();
            } 
            else {
              //alert("ganjil");
              newfx = changefx(tempfx,x);
              Convert(newfx);
              simp[1]= simp[1] + 4*Compute();
            }

          }

          x = parseFloat(x) + h;
          //i++;
        }

        total = (simp[0] + simp[1] + simp[2] + simp[3])*h/3;


        $("p#hasil").html("`I = "+h/3+"["+simp[0]+" + "+simp[1]+"+ "+simp[2]+"+ "+simp[3]+"] = "+total+" `");
        //$("p#hasil").append("=`");
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,"hasil"]);
         


          tempfx = changefx(tempfx,"x");
          //board = JXG.JSXGraph.initBoard('box',
           // {originX:100, originY:150, unitX:20, unitY:20, axis:true,
          //showNavigation:false, showCopyright:false});
          board = JXG.JSXGraph.initBoard('box', {boundingbox: [-6, 12, 8, -6], axis: true});
          
          
          var f = board.jc.snippet(tempfx, true, 'x', true);
          var theFct = board.create('functiongraph', [f]);
          board.create('integral',[[eval(x1),eval(x2)],theFct],
            {color:'red',fillOpacity:0.2});
          



          //board.create('riemannsum',[theFct,eval(n),'trapezodial',eval(x1),eval(x2)])
          //board.create('functiongraph',[[theFct,eval(x1),eval(x2)]];



          //theFct = board.create('functiongraph',
          //  [function(x){return eval(tempfx);}]);
          


      }
      else alert("n must be even and n>=2");
          //2x^2 + 3/5x + 3
      });

});

