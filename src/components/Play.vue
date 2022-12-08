<template>
    <button v-on:click="lookSanta(this.$route.params.id)" v-if="((getInfo['created'] && !getInfo['autoPlay']) && getInfoTO['guess'])" class="why" style="width: 100%;border-radius: 0;">Показать всем сант!</button>
    <div>
        <div v-if="!getGuess">
            <h2 class="gametitle">Игра началась!!!</h2>
            <h3 class="newYear">Поздавляем вас с Новым годом!🎄🍾</h3>
            <div class="cardPlay">
                <div class="infoCard">
                    <h3 class="title">Попробуйте угадать кому вы будете дарить подарок</h3>
                    <h4 class="title">У вас осталось {{3 - this.a}} попытки</h4>
                    <div class="listCard">
                        <div class="listPlayerCard" v-on:click="question(player['fullname'], getInfoTO['user'], index)" v-for="(player, index) in getPlayers">
                            <h1 v-if="(getInfoTO['from']!=player['fullname'])" class="card_player" v-bind:class="this.no[index]=='x'?'noA':''">
                                {{player['fullname']}}
                            </h1>
                            <h1 v-else class="card_player" v-bind:class="this.no[index]=='x'?'noA':''">
                                Это вы
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="">
            <div v-if="!getFromActive" class="cardPlay mt">
                <div class="infoCard">
                    <div>
                        <h3 class="title">А вот и конец!</h3>
                        <h4 class="title" style="margin-bottom: 0;">Пора дарить подарки🎅🎁</h4>
                        <hr>
                        <h2 class="nameTo">Вы дарите подарок: {{getInfoTO['user']}}</h2>
                        <h2 class="priceTo">Максимальная сумма подарка: {{getInfoTO['price']}}₽</h2>
                        <h2 class="wishTo">Человек хочет: </h2>
                        <h2 class="wishTo">{{getInfoTO['wish']}}</h2>
                        <h2 v-if="getInfoTO['from_']" class="nameTo">Вам дарит подарок: {{getInfoTO['from_name']}}</h2>
                    </div>
                    <div>
                        <button v-if="getInfoTO['fromNam']" class="why" v-on:click="setActive(true)">Хотите узнать кто подарит вам подарок?</button>
                    </div>
                </div>
            </div>
            <div v-if="(getFromActive && getInfoTO['fromNam'])" class="cardPlay mt">
                <div class="infoCard">
                    <div>
                        <h3 class="title">Кто твой санта?</h3>
                        <h4 class="nameTo" style="margin-bottom: 5px;margin-top: 0;">Если вы не угадаете, то узнаете только если создатель комнаты разрешит🤐</h4>
                        <h4 class="title" style="margin-bottom: 0;">У вас осталось {{(3-this.b)}} попытки</h4>
                        <hr>
                        <div class="listCard">
                            <div v-on:click="santa(player['santa'], index)" class="listPlayerCard" v-for="(player, index) in getSantas" >
                                <h1 class="card_player" v-bind:class="this.no_b[index]=='x'?'noA':''">
                                    {{player['fullname']}}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button style="width: 100px;" class="why" v-on:click="(setActive(false))">Назад</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</template>
<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    export default{
        methods:{
            ...mapActions(['getResualt', 'okRes', 'getUser', 'ActiongetSantas', 'setSanta', 'lookSanta']),
            ...mapMutations(['setActive']),
            question(name, fullname, index){
                if(this.a < 3){
                    if (name == fullname){
                        console.log("Ответ правильный")
                        this.okRes(this.$route.params.id)
                    }else{
                        console.log("Попробуй еще, попыток осталось" + 3 - this.a)
                        this.no[index]='x'
                        this.a++
                        if(this.a == 3){
                            this.okRes(this.$route.params.id)
                        }
                    }
                }else{
                    console.log('Это не важно, ты все равно попал в мое сердце')
                    this.okRes(this.$route.params.id)
                }
            },
            santa(santa, index){
                if(this.b < 3){
                    if (santa){
                        console.log("Ответ правильный")
                        const o =  this.setSanta([this.$route.params.id, 1])
                    }else{
                        console.log("Попробуй еще, попыток осталось" + 3 - this.b)
                        this.no_b[index]='x'
                        this.b++
                        if(this.b == 3){
                           const o =  this.setSanta([this.$route.params.id, 0])
                        }
                    }
                }else{
                    console.log('Это не важно, ты все равно попал в мое сердце')
                    const o =  this.setSanta([this.$route.params.id, 0])
                }
            }

        },
        computed: mapGetters(['getInfoTO', 'getPlayers', 'getGuess','getSantas', 'getFromActive', 'getInfo']),
        mounted(){
            this.getResualt(this.$route.params.id),
            this.ActiongetSantas(this.$route.params.id)
        },
        data(){
            return{
                a:0,
                b:0,
                no:[],
                no_b:[],
            }
        },
        updated(){
        }
    }

</script>
<style scoped>
@import url('../assets/style/play.css')
</style>