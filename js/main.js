  // COMPENTE CALENDARIO
  Vue.component('date', {
    template: `
              <div class="container calendar">
              <div class="month">
                  <span class="prev" @click="lastMonth">
                      <i class="fa-solid fa-angle-left"></i>
                  </span>
                          
                        <p>
                            {{monthNames}}<br>
                          <span>{{yearNames}}</span>
                        </p>
                      
            <span class="next" @click="nextMonth">
              <i class="fa-solid fa-angle-right"></i>
            </span>
          </div>

                <ul class="weekdays">
                  <li>Lu</li>
                  <li>Ma</li>
                  <li>Mi</li>
                  <li>Ju</li>
                  <li>Vi</li>
                  <li>Sa</li>
                  <li>Do</li>
                </ul>
                          <transition name="slide-fade">
                          <div class="days" v-if="show" >
                            <span v-for="dataFechS in dataFech" @click="sendDays(dataFechS.days)">
                            <i class="active" v-if="dataFechS.days==printDate() && month==printMonth() && yearNames==printYear()">{{dataFechS.days}}</i>
                            <i v-else>
                            <i v-if="dataFechS.option=='disable'" class="disable">{{dataFechS.days}}</i>
                            <i v-else>  {{dataFechS.days}}</i>
                          </i>
                            </span>
                          </div>
                          </transition>
                          </div>

    `,
  
    data: () => ({
      
      date: 0,
      dataFechDays:[],
      dataFechlas:[],
      dataFech:[],
      month: '',
      monthNames:'',
      year: '',
      yearNames: '',
      fulldate:'',
      show: true,
      meses:
      [
        {id:0, text:"Enero"},
        {id:1,text:"Febrero"},
        {id:2,text:"Marzo"},
        {id:3,text:"Abril"},
        {id:4,text:"Mayo"},
        {id:5,text:"Junio"},
        {id:6,text:"Julio"},
        {id:7,text:"Agosto"},
        {id:8,text:"Septiembre"},
        {id:9,text:"Octubre"},
        {id:10,text:"Noviembre"},
        {id:11,text:"Diciembre"}
    ]
    
      
    }),
    methods: {
      printDate: function () { // IMPRIME EL DIA 
        return new Date().getDate();
      },

      printMonth: function () {// IMPRIME EL MES 
        return new Date().getMonth();
      },          

      printYear: function(){// IMPRIME EL AÑO
        return new Date().getFullYear();
      },

      writeMonth :function(month){ // ESCRIBE EL MES 
      
          if (this.dataFech.length==0) {
              
              this.writeDays(month)
              
          }else{

            this.dataFech=[]
            this.writeDays(month)
                
          }

      },

      writeDays:function(month){ //ESCRIBE LOS DIAS 

          for(let i = this.startDay(); i>0;i--){//DIA DEL MES ANTERIOR

              this.dataFechlas[i]=this.getTotalDays(month-1)-(i-1) 
              this.dataFech.push({days:this.dataFechlas[i],option:'disable'})

          }

          for(let i=1; i<=this.getTotalDays(month); i++){//DIAS DEL MES ACTUAL
              
              this.dataFechDays[i]=i

              this.dataFech.push({days:this.dataFechDays[i],option:''})

          }
          
      },

      getTotalDays:function(month){ //VERIFICAR EL NÚMERO DE DIAS DEL MES

              if(month === -1) { return 31}

              if (month == 0 || month ==2 || 
                  month == 4 || month == 6 || 
                  month == 7 || month == 9 || 
                  month == 11) {
                  
                    return  31;

              } else if (month == 3 || month == 5 || 
                          month == 8 || month == 10) {
                      return 30;

              } else {

                  return this.isLeap() ? 29:28;
              }

      },

      isLeap:function(){ //PREGUNTAR SI EL AÑO ES VICIESTO
            return ((this.year % 100 !==0) && (this.year % 4 === 0) || (this.year % 400 === 0));
      },

      startDay:function(){ //SABER QUE DIA EMPIEZA LA SEMANA
              let start = new Date(this.year,this.month, 1)
              return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1

      },

      lastMonth :function(){ //MES ANTERIOR
     
              if(this.month !== 0){
                    this.month--
                  }else{
                    this.month = 11
                    this.year--
                    }
        
                      this.setNewDate()
                      this.animate()
      },

      nextMonth:function(){ // MES SIGUIENTE
    
                  if(this.month !== 11){
                    this.month++
                }else{
                    this.month = 0;
                    this.year++
                }
                      this.setNewDate()
                      this.animate()
 
                      
      },

      setNewDate :function(){//NUEVO AÑO

        this.monthNames = this.meses[this.month].text;
        this.yearNames= this.year
        this.writeMonth(this.month)//ENVIAR MES
        
      },

      animate:function(){ // ANIMAR CALENDARIO 
 
        this.show = false
        const self = this
        setTimeout(function() {self.show = true}, 2000)
      },

      sendDays:function(value){// ENVIAR FECHA SELECCIONADA
        this.$emit('fecha',(value+"/"+this.monthNames+"/"+this.yearNames))
      }

    },

    mounted () {

      this.month = this.printMonth() //CAPTURAR LOS VARLORES ACTULES DE MES
      this.year= this.printYear()//AÑO ACTUAL
      this.writeMonth(this.month)//ENVIAR EL MES ACTUAL
      this.monthNames = this.meses[this.month].text;//VERFICAR QUE NUMERO ESTA EL MES
      this.yearNames= this.year
   
      let fechs=new Date()
      this.fulldate=fechs.getDate()+"/"+this.meses[fechs.getMonth()].text+"/"+fechs.getFullYear()//FECHA ACTUAL
      this.$emit('printdate',this.fulldate)//ENVIAR FECHA ACTUAL

    },

   
  })


  // COMPONENT MUESTAR LAS TAREAS Y TIENE LAS ACCIONES DE ACTULIZAR Y ELIMINAR
  Vue.component('todo', {
    props: {'todos':Array},
    data: () => ({
      status:'',
      task_option_show:true,
      To_Do:false,
      In_Progress:false,
      Done:false,
      visuallyhidden :true,
    }),
    template: `
    <transition name="fade">
    <div class="task">
    <div class="task_data"> 
    <div class="task_option">
				<span class="task_option_menu" @click="showOption" title="Menú">
					<i class="fas fa-ellipsis-h" ></i>
				</span>
				 <div :class="{task_option_show,visuallyhidden}" >
              <span class="task_option_edit" @click="showModal(todos.Option,todos.id)" title="Editar"> 
                <i class="fas fa-pen"></i>
              </span>
              <span class="task_option_del" @click="$emit('remove',todos.id)" title="Eliminar">
                <i class="fas fa-ban"></i>
              </span>
         </div>
			</div>

        <div class="task_item1" :title="todos.Option" :class="{To_Do,In_Progress,Done}"> <span>{{ todos.Task }}</span></div>
        <div class="task_item2" :title="todos.Option"> <span>{{ todos.Student  }}</span></div>

        </div>
        <div class="task_item" :title="todos.Option"> <span>{{ todos.Date}}</span></div>
      </div>
      </transition>
    
  `,
  methods:{
    
      showOption(){ // ANIMACIÓN DEL MENÚ

                if (this.task_option_show==false) {
                  
                this.visuallyhidden=true

                const self = this

                  setTimeout(function() { self.task_option_show= true}, 1000)

                }else{

                  this.visuallyhidden =false
                  this.task_option_show=false
                  
                }
      },

      showModal(option,id){ //CAPTURAR OPCIÓN DE LAS TAREAS
          
      if (option=='Tareas completadas') {
        Swal.fire({
            
          icon: 'info',
          title: 'Información!',
          text: 'Esta tarea ya está terminada.',
              showCloseButton: true,
              confirmButtonColor: '#394cfe',
              focusConfirm: false,
              confirmButtonText:'ok',
          
            })

      }else{
        Swal.fire({
          title: 'Estado de la tarea',
          html:
          `
        
          <div class="radio-buttons-list">
          <label class="radio">
            <input class="radio__input" type="radio" id="radio1"  name="radio">
            <span class="radio__span">Tareas pendientes</span>
          </label>
          <label class="radio">
            <input class="radio__input" type="radio" id="radio2" name="radio">
            <span class="radio__span">Tareas iniciadas</span>
          </label>
          <label class="radio">
            <input class="radio__input" type="radio" id="radio3" name="radio">
            <span class="radio__span">Tareas completadas</span>
          </label>
        </div>


        `,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonColor: '#394cfe',
          cancelButtonColor: '#6c757d',
          focusConfirm: true,
          confirmButtonText:'Agregar',
        }).then((result) => {

          if (result.isConfirmed) {
              if (document.getElementById('radio1').checked) { 
                this.To_Do=true
                this.In_Progress=false
                this.Done=false
                this.status="Tareas pendientes"
                this.$emit('edit',[id,this.status])//ENVIAR EL VALOR A ACTULIZAR
          }
          
          if (document.getElementById('radio2').checked) {
                this.To_Do=false
                this.In_Progress=true
                this.Done=false
                this.status="Tareas iniciadas"
                this.$emit('edit',[id,this.status])//ENVIAR EL VALOR A ACTULIZAR
          }
          
          if (document.getElementById('radio3').checked) {
                this.To_Do=false
                this.In_Progress=false
                this.Done=true
                this.status="Tareas completadas"
                this.$emit('edit',[id,this.status])//ENVIAR EL VALOR A ACTULIZAR
          }
            
  
            
          }
        })
      }

      }

  },

  mounted(){

    switch (this.todos.Option) {//VALIDAR LAS TAREAS 

      case 'Tareas pendientes':
        this.To_Do=true
        this.In_Progress=false
        this.Done=false
        break

      case 'Tareas iniciadas':
        this.To_Do=false
        this.In_Progress=true
        this.Done=false
        break
      case 'Tareas completadas':
        this.To_Do=false
        this.In_Progress=false
        this.Done=true
        break  
    
      default:
        break;
    }

  },

  
  
  })
 
 

  const app=new Vue({
    el:"#app",
    props: {'fulldate':String},
    data:{
       student:'',
       task:'',
       band:true,
       All:false,
       To_Do:false,
       In_Progress:false,
       Done:false,
       btn_enable:true,
       cont_to:0,
       cont_progress:0,
       cont_done:0,
       posicion:0,
       date_:'',
       todosCopy:[],

       todos: [
            { id: 0, Student: 'Juan',Task:'Aprender JavaScript',Date:'22/Febrero/2022',Option:'Tareas pendientes' },
            { id: 1, Student: 'Rick',Task: 'Aprender Vue',Date:'22/Febrero/2022',Option:'Tareas iniciadas' },
            { id: 2, Student: 'Pedro',Task: 'Construir algo increíble',Date:'24/Febrero/2022',Option:'Tareas completadas' }
          ],

       nextTodoId: 3   
    },

    created:function () {
      if (localStorage.getItem('todos')) { //PREGUTA SI EXISTEN DATOS ALAMACENADOS EN EL NAVEGADOR
        try {
          this.todos = JSON.parse(localStorage.getItem('todos'));//MUESTRA LOS DATOS ALMACENDADOS
          this.todosCopy=this.todos
        } catch(e) {
          localStorage.removeItem('todos') //BORRAR LAS TAREAS ALMACENADAS EN EL NAVEGADOR
        }
        }else{this.todosCopy=this.todos}

    },

    methods: {

      modal(){ //VERFICAR  DEL BOTON DE AGREGAR 
                  if (this.btn_enable==false) { //CUANDO SE FILTRA NO SE PUEDE AGRAGAR DATOS
                                Swal.fire({
                                          
                                  icon: 'info',
                                  title: 'Información!',
                                  text: 'Para habilitar el botón de click en Todos las Tareas.',
                                      showCloseButton: true,
                                      confirmButtonColor: '#394cfe',
                                      focusConfirm: false,
                                      confirmButtonText:'ok',
                                  
                                    })
                  }else{ //AGREGAR TAREAS
                          Swal.fire({
                            title: 'Agregar tarea',
                            html:
                            `
                            <div class="container-form-input ">
                              <input type="text" id="student" class="input__text" placeholder="Estudiante">
                              <input type="text" class="input__text" id="task" placeholder="Tarea">
                            </div>
                              
                          `,
                            showCloseButton: true,
                            showCancelButton: true,
                            confirmButtonColor: '#394cfe',
                            focusConfirm: true,
                            confirmButtonText:'Agregar',
                          }).then((result) => {

                            if (result.isConfirmed) {

                                this.student=document.getElementById("student").value
                                this.task=document.getElementById("task").value
                              
                                  if(this.student=='' || this.task==''){

                                        Swal.fire({

                                          icon: 'error',
                                          title: 'Oops...',
                                          text: '¡Algo salió mal!',                        
                                          showCloseButton: true,
                                          confirmButtonColor: '#394cfe',
                                          focusConfirm: false,
                                          confirmButtonText:'ok',

                                        })

                                  }else{

                                        this.add()//AGREGAR LA NUEVA TAREA
                                  }
                                
                            }
                          })
                        }
      },

      add(){  // AGREGAR NUEVA TAREA
        
        this.todos.push({

          id: this.nextTodoId++,
          Student:this.student,
          Task:this.task,
          Date:this.date_,
          Option:'Tareas pendientes'

        })
        this.todosCopy=this.todos
        this.band=true
        this.status()  // VERFICAR EL ESTADO DE CADA TAREA
        this.saveTodo() // GUARDAR LOS DATOS EN EL NAVEGADOR
      },

      editTask(index){ //EDITAR TAREAS
   
              for (let i = 0; i < this.todos.length; i++) {

                        if (this.todos[i].id==index[0]) {
                            this.todos[i].Option=index[1] 
                        }

                
              }
              
        this.status()  // VERFICAR EL ESTADO DE CADA TAREA
        this.saveTodo() // GUARDAR LOS DATOS EN EL NAVEGADOR
      },

      removeTask(index){ //ELIMINAR UNA TAREA DEL ARREGLO
            
        this.todos.splice(index,1)

        if (this.todos.length==0) {
          this.band=false
          this.nextTodoId=1
          localStorage.clear()
        }else{
          this.saveTodo() // GUARDAR LOS DATOS EN EL NAVEGADOR
        }
        this.status() // VERFICAR EL ESTADO DE CADA TAREA
        this.todosCopy=this.todos
      },
     
      status(){ // VERFICAR EL ESTADO DE CADA TAREA

      let i=0 ,j=0, k=0
        this.todos.filter(task=>{
         
          switch (task.Option) {

            case 'Tareas pendientes':
              i++
              break;

            case 'Tareas iniciadas':
              j++
              break;

            case 'Tareas completadas':
                k++
                break;

            default:
              break;

          }
          
        
        })
      
        this.cont_to=i
        this.cont_progress=j
        this.cont_done=k

      },

      onFullDate (value) { //CAPTURAR EL VALOR DEL DIA ACTUAL

        this.date_=value

      },

      taskFilter(option){ //FILTRA POR TAREA
        
            switch (option) {
              case '':
                this.All=true
                this.To_Do=false
                this.In_Progress=false
                this.Done=false
                this.btn_enable=true
                break;

              case 'Tareas pendientes':
                this.All=false
                this.To_Do=true
                this.In_Progress=false
                this.Done=false
                this.btn_enable=false
                break;

              case 'Tareas iniciadas':
                this.All=false
                this.To_Do=false
                this.In_Progress=true
                this.Done=false
                this.btn_enable=false
                break;

              case 'Tareas completadas':
                this.All=false
                this.To_Do=false
                this.In_Progress=false
                this.Done=true
                this.btn_enable=false
                break;

              default:
                break;
            }
          
       this.todos=this.todosCopy

       this.todos=this.todos.filter(
          
            task=>{
              return task.Option.includes(option)
            }
            
          )
  

      },

      filerFech(index){ //FILTRAR POR FECHA
        this.btn_enable=false
        this.todos=this.todosCopy

       this.todos=this.todos.filter(
          
            task=>{
              return task.Date.includes(index)
            })
      },

      saveTodo() { // GUARDAR LOS DATOS EN EL NAVEGADOR
        const parsed = JSON.stringify(this.todos)
        localStorage.setItem('todos', parsed)
      }
      
    },
    mounted(){
      
        this.status()// VERFICAR EL ESTADO DE CADA TAREA
        this.All=true //MOSTRAR TODAS LAS TAREAS
      },
      beforeUpdate() {
        this.status()// VERFICAR EL ESTADO DE CADA TAREA
      }
     
})
