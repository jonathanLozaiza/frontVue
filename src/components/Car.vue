<template>
        <div style="margin: 5px auto; width: 100%;">
            <Toast />
            <Panel header="Cars">
                <Menubar :model="items" style="margin: 5px 0" />
                <DataTable 
                    :value="cars" 
                    :paginator="true" 
                    :rows="10"
                    selectionMode="single" 
                    :selection.sync="selectedCar" 
                    dataKey="id"
                >
                    <Column field="id" header="id"></Column>
                    <Column field="car_plate" header="Car Plate"></Column>
                    <Column field="car_model" header="Car Model"></Column>
                </DataTable>
            </Panel>
            <Dialog header="cars" :visible.sync="displayModal" :style="{width: 'auto'}" :modal="true">
                <span class="p-float-label" style="margin-top: 20px; width: 100%;">
                    <InputText id="car_plate" type="text" v-model="car.car_plate" />
                    <label for="car_plate">Car Plate</label>
                </span>

                <span class="p-float-label" style="margin-top: 30px; width: 100%;">
                    <InputText id="car_model" type="text" v-model="car.car_model" />
                    <label for="car_model">Car Model</label>
                </span>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                    <Button label="Save" icon="pi pi-check" @click="save" autofocus />
                </template>
            </Dialog>
        </div>
</template>

<script>
import CarService from '../service/carService'
import {getUser} from '../service/userService'

export default {
    name: 'Car',
    data() {
        return {
            cars: null,
            car: {
                car_plate: null,
                car_model: null
            },
            selectedCar: {
                id: null,
                car_plate: null,
                car_model: null,
            },
            type:null,
            items: [
                {
                    label:'New',
                    icon:'pi pi-fw pi-user-plus',
                    command: () =>{
                        this.showSaveModal();
                    }
                },
                {
                    label:'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    command: () => {
                        this.edit();
                    }
                },
                {
                    label:'Delete',
                    icon:'pi pi-fw pi-trash',
                    command: () => {
                        this.delete();
                    }
                },
                {
                    label:'Refresh',
                    icon: 'pi pi-fw pi-refresh',
                    command: () => {
                        
                    }
                },
            ],
            displayModal: false,   
        }
    },
    carService : null,
    created(){
        this.carService = new CarService();
    },
    mounted(){
        this.getUserAuth();
        this.getAll()
    },
    methods : {

        getUserAuth(){
            getUser().then(data => {
                if(data.error){
                    this.$router.push('/');
                }
            })
        },

        showSaveModal() {
            this.type = 'Create'
            this.displayModal = true;
        },

        getAll(){
            this.carService.getAll().then(data => {
                this.cars = data.data.data;
                console.log(this.cars);
            })
        },

        save(){

            if(this.type=="Create"){
                this.carService.save(this.car).then(data => {
                    console.log(data);
                    if(data.status == 200){
                        this.getAll()
                        this.car = {
                            car_plate: null,
                            car_model: null,
                        }
                        this.displayModal = false;
                    }
                })
            }
            
            if(this.type=="Edit"){
                this.carService.edit(this.selectedCar.id,this.car).then(data => {
                    console.log(data);
                    this.getAll();
                    this.car = {
                            car_plate: null,
                            car_model: null
                        }
                        this.displayModal = false;
                })
            }
        },

        closeModal(){
            this.car = {
                car_plate: null,
                car_model: null
            }
            this.displayModal = false;
        },

        edit(){
            this.type = 'Edit'
            const {car_plate,car_model} = this.selectedCar;
            this.car = {
                car_plate,
                car_model
            }
            this.displayModal = true;
        },

        delete(){
            if(confirm("Estas seguro de que quieres eliminar el registro?")){
                this.carService.delete(this.selectedCar.id).then(data=>{
                    if(data.status==200){
                        this.getAll();
                        this.$toast.add({
                            severity:"success",
                            summary:"Atención!!",
                            detail:"Se eliminó el registro correctamente",
                            life:3000
                        })
                    }
                })
            }
        }
    }
}
</script>

<style scoped>

</style>