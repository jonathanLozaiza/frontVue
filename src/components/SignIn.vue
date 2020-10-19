<template>
    <div  class="log">
        <Panel  header="Login">
            <span class="p-float-label" style="margin-top:30px;">
                <InputText id="email" type="email" v-model="user.email" style="width:100%" />
                <label for="email">email</label>
            </span>
            <span class="p-float-label" style="margin-top:30px;">
                <InputText id="password" type="password" v-model="user.password" style="width:100%" />
                <label for="password">password</label>
            </span>

            <Button label="Login" @click="signIn" autofocus style="margin-top:30px; width:100%" />
        </Panel>
    </div>
</template>

<script>
    import {getUser, getToken} from '../service/userService';

    export default {
        name:"SignIn",
        data(){
            return {
                user: {
                    email:'',
                    password:''
                }
            }
        },
        userService:null,
        created(){
            this.getPermise();
        },
        mounted(){
            //this.getPermise();
        },
        methods: {
            signIn(){
                if(this.user.email.trim() === '' || this.user.password === ''){
                    return alert('ERROR');
                }

                getToken(this.user).then(data => {
                    if(!data){
                        return alert("ERROR");
                    }
                    
                    location.reload();
                    //this.$router.push('/');
                });
            },

            getPermise(){
                getUser().then(data => {
                    if(!data.error){
                        this.$router.push('cars');
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