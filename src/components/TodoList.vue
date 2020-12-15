<template>
  <div class="inner-cont">
   <div> 
      <h1>{{title}}</h1>
    </div>
    <ul class="list">
      <li class="list-item" v-for="(hero, index) in heroes" :key="hero.id">
        <div class="list-name">{{hero.name}}</div><button class="btn btn-primary" @click="removeHero(index)">x</button>
      </li>
    </ul>
    <div class="add-hero">
      <input v-model="newHero"/>
      <button @click="addHero(newHero)">Add</button>
    </div>
  </div>
</template>

<script>
export default {
computed: {
    maxHeroId: {
      get(){
        return Math.max(...this.heroes.map(a => a.id));
      }
    }
  },
  methods: {
    addHero(hero){
      this.heroes.push({id: this.maxHeroId + 1, name: hero});
      this.newHero = '';
    },
    removeHero(index){
      console.log(index);
      this.heroes.splice(index, 1);
    }
  },
  data(){
    return{
      newHero: '',
      title: 'İsimler',
      heroes: [
        {id: 0, name: 'Taha'},
        {id: 1, name: 'Muhsin'},
        {id: 2, name: 'Nazlı'},
        {id: 3, name: 'Sude'},
        {id: 4, name: 'Pınar'}
      ],
    } 
  }
}
</script>

<style scoped>
.list-item {
    margin: 0.7em 0;
    display: flex;
    justify-content: space-between;
  }

  .list {
    list-style-type: none;
    width: 100%;
  }

  .list-name {
    width: 200px;
    display:flex;
    align-items: center;
  }

  .add-hero {
    width: 100%;
  }

  .add-hero input {
    width: 70%;
  }

  .add-hero button {
    width: 30%;
  }

  h1 {
    text-align: center;
  }
</style>