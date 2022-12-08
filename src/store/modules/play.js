import { useToast } from "vue-toastification";
export default{
    state: {
        info:[],
        url_server: '45.9.24.240',
        list_santas:[],
        active_from:false,
    },
    getters: {
        getInfoTO(state){
            return state.info
        },
        getGuess(state){
            return state.info['guess']
        },
        getSantas(state){
            return state.list_santas
        },
        getFromActive(state){
            return state.active_from
        }
    },
    mutations: {
      setActive(state, st){
        state.active_from = st
      }
    },
    actions: {
       async getResualt(ctx, id){
        let formData = new FormData();
            formData.append('token', localStorage.getItem('token'));
            formData.append('id_room', id);
            fetch(`http://${ctx.state.url_server}:8000/api/v1/room/resualt`,{
                    method: "POST",
                    body: formData,
                }).then(res=>res.json()).then(data=>{
                   ctx.state.info = JSON.parse(data)[0]
                })
       },
       async okRes(ctx, id){
            let formData = new FormData();
            formData.append('token', localStorage.getItem('token'));
            formData.append('id_room', id);
            fetch(`http://${ctx.state.url_server}:8000/api/v1/room/res`,{
                    method: "POST",
                    body: formData,
                }).then(res=>res.json()).then(data=>{
                ctx.state.info = JSON.parse(data)[0]
                })
       },
       async ActiongetSantas(ctx, id){
        if(ctx.state.info!=null){
            fetch(`http://${ctx.state.url_server}:8000/api/v1/room/toSanta?token=${localStorage.getItem('token')}&id_room=${id}`).then(res=>res.json()).then(data=>{
                ctx.state.list_santas = JSON.parse(data)
             })
        }
       },
       setSanta(ctx, id){
            let formData = new FormData();
            formData.append('token', localStorage.getItem('token'));
            formData.append('id_room', id[0]);
            formData.append('status', id[1]);
            fetch(`http://${ctx.state.url_server}:8000/api/v1/room/toSanta`,{
                    method: "POST",
                    body: formData,
                }).then(res=>res.json()).then(data=>{
                    ctx.state.info = JSON.parse(data)[0]
                    ctx.state.active_from = false
                })
       },
       lookSanta(ctx, id){
        let formData = new FormData();
        formData.append('token', localStorage.getItem('token'));
        formData.append('id_room', id);
        fetch(`http://${ctx.state.url_server}:8000/api/v1/room/toSanta`,{
                method: "PUT",
                body: formData,
            }).then(res=>res.json()).then(data=>{
                const a = JSON.parse(data)[0]
                ctx.state.info = JSON.parse(a['data'])
                ctx.state.active_from = false
                const toast = useToast()
                toast.info(a['mas'])
            })
   }
    },
}