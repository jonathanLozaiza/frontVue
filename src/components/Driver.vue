<template>
        <div style="margin: 5px auto; width: 100%;">
            <Toast />
            <Panel header="Drivers">
                <Menubar v-if="flag" :model="items" style="margin: 5px 0" />
                <DataTable 
                    :value="drivers" 
                    :paginator="true" 
                    :rows="10"
                    selectionMode="single" 
                    :selection.sync="selectedDriver" 
                    dataKey="id"
                >
                    <Column field="id" header="id"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="birthdate" header="Birthdate"></Column>
                </DataTable>
            </Panel>
            <Dialog header="drivers" :visible.sync="displayModal" :style="{width: 'auto'}" :modal="true">
                <span class="p-float-label" style="margin-top: 20px; width: 100%;">
                    <InputText id="name" type="text" v-model="driver.name" />
                    <label for="name">Name</label>
                </span>

                <span class="p-float-label" style="margin-top: 30px; width: 100%;">
                    <InputText id="birthdate" type="text" v-model="driver.birthdate" />
                    <label for="birthdate">Birthdate</label>
                </span>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                    <Button label="Save" icon="pi pi-check" @click="save" autofocus />
                </template>
            </Dialog>
        </div>
</template>

<script>
import DriverService from '../service/driverService'
import {getUser} from '../service/userService'

export default {
    name: 'Diver',
    data() {
        return {
            drivers: null,
            driver: {
                name: null,
                birthdate: null
            },
            selectedDriver: {
                id: null,
                name: null,
                birthdate: null,
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
            flag: true    
        }
    },
    driverService : null,
    created(){
        this.driverService = new DriverService();
    },
    mounted(){
        this.getUserAuth()
        this.getAll()
    },
    methods : {

        getUserAuth(){
            getUser().then(data => {
                if(data.error){
                    this.$router.push('/');
                }
                
                if(data.data.data.user.role === 'Manager'){
                    this.flag = false;
                }
            })
        },

        showSaveModal() {
            this.type = 'Create'
            this.displayModal = true;
        },

        getAll(){
            this.driverService.getAll().then(data => {
                this.drivers = data.data.data;
                console.log(this.drivers);
            })
        },

        save(){

            if(this.type=="Create"){
                this.driverService.save(this.driver).then(data => {
                    console.log(data);
                    if(data.status == 200){
                        this.getAll()
                        this.driver = {
                            name: null,
                            birthdate: null,
                        }
                        this.displayModal = false;
                    }
                })
            }
            
            if(this.type=="Edit"){
                this.driverService.edit(this.selectedDriver.id,this.driver).then(data => {
                    console.log(data);
                    this.getAll();
                    this.driver = {
                            name: null,
                            birthdate: null
                        }
                        this.displayModal = false;
                })
            }
        },

        closeModal(){
            this.driver = {
                name: null,
                birthdate: null
            }
            this.displayModal = false;
        },

        edit(){
            this.type = 'Edit'
            const {name,birthdate} = this.selectedDriver;
            this.driver = {
                name,
                birthdate
            }
            this.displayModal = true;
        },

        delete(){
            if(confirm("Estas seguro de que quieres eliminar el registro?")){
                this.driverService.delete(this.selectedDriver.id).then(data=>{
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