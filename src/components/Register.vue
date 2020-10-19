<template>
    <div class="log">
        <Panel header="Register">
            <Dropdown style="width:100%" v-model="selectedRol" :options="account_types" optionLabel="type" placeholder="Select Account Type" />
            <span class="p-float-label" style="margin-top:30px;">
                <InputText id="name" type="text" v-model="user.name" style="width:100%" />
                <label for="name">name</label>
            </span>
            <span class="p-float-label" style="margin-top:30px;">
                <InputText id="email" type="email" v-model="user.email" style="width:100%" />
                <label for="email">email</label>
            </span>
            <span class="p-float-label" style="margin-top:30px;">
                <InputText id="password" type="password" v-model="user.password" style="width:100%" />
                <label for="password">password</label>
            </span>

            <Button label="Register" @click="signUp" autofocus style="margin-top:30px; width:100%" />
        </Panel>
    </div>
</template>

<script>
    import {registerUser} from '../service/userService';
    export default {
        name:'Register',
        data() {
            return {
                user:{
                    role:'',
                    name:'',
                    email:'',
                    password:''
                },
                selectedRol:'',
                account_types:[
                    {type:'Admin'},
                    {type:'Manager'}
                ]
            }
        },
        created() {

        },
        mounted(){

        },
        methods: {
            signUp(){

                if(this.selectedRol.type){
                    this.user.role = this.selectedRol.type;
                }
                
                if(this.user.role.trim() === '' || this.user.name.trim() === '' || this.user.email.trim() === '' || this.user.password.trim() === ''){
                    return alert("ERROR");
                }
                registerUser(this.user).then(data => {
                    if(data){
                        this.$router.push('/');
                    }else{
                        return alert("ERROR");
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .log{
        width:400px;
        padding-top: 150px;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 150px;
    }
</style>