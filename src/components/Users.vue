<template>
    <div class="uMenu">
        <h3 class="title">Игроки</h3>
        <div class="list_players">
            <div v-for="(player, id) in getPlayers" class="player">
                <h4 v-if="getInfo['why']" class="name_player">{{player['fullname']}}</h4>
                <h4 v-else class="name_player">...Имя</h4>
                <h4 v-if="getInfo['why']" class="name_player">{{player['ready']?'Готов':'Не готов'}}</h4>
                <button v-on:click="expel(id)" v-if="getInfo['why'] &&((getInfo['you']!=player['fullname']) && getInfo['created'])" class="lock">Убрать</button>
                <button v-on:click="setStatus(this.$route.params.id)" v-if="getInfo['why'] && !getInfo['created'] &&(getInfo['you']==player['fullname'])" class="lock">{{getInfo['ready']?'Вы готовы!':'Вы не готовы'}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { useToast } from "vue-toastification";
    import { mapGetters, mapActions } from 'vuex';
    export default{
        computed: mapGetters(['getPlayers', 'getInfo']),
        data(){
            return{
                interval:null,
            }
        },
        methods:{
            ...mapActions(['listPlayers', 'setStatus']),
            get(){
                this.listPlayers(this.$route.params.id)
            },
            expel(id){
                console.log(id)
                let formData = new FormData();
                formData.append('token', localStorage.getItem('token'));
                formData.append('id_room', this.$route.params.id);
                formData.append('id', id);
                fetch('http://45.9.24.240:8000/api/v1/room/status',{
                        method: "POST",
                        body: formData,
                    }).then(res=>res.json()).then(data=>{
                        const toast = useToast()
                        toast.success(data['mas'])
                    })
            }
        },
        mounted(){
            this.listPlayers(this.$route.params.id)
            this.interval = setInterval(this.get, 5000)
        }
    }
</script>

<style scoped>
    @import url('../assets/style/users.css')
</style>