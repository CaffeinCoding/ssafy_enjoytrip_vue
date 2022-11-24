<template>
  <div>
    <div class="card-container">
      <div class="item front">
        <img
          :src="
            'http://localhost:1010/upload/file/' +
            article.fileInfos[0].saveFolder +
            '/' +
            article.fileInfos[0].saveFile
          "
        />
      </div>
      <div class="item back" style="background-color: rgba(0, 0, 0, 0.7)">
        <div class="card-image">
          <!-- <img
            :src="
              'http://localhost:1010/upload/file/' +
              article.fileInfos[0].saveFolder +
              '/' +
              article.fileInfos[0].saveFile
            "
          /> -->
        </div>

        <div class="text-content">{{ article.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardListItem",
  props: {
    article: Object,
  },
};
</script>
<style scoped>
body {
  padding: 30px;
}

.card-container {
  width: 300px;
  height: 400px;
  perspective: 600px;
  justify-content: center;
}

.card-container .item {
  width: 300px;
  height: 400px;
  font-size: 35px;
  backface-visibility: hidden;
  transition: 1s;
}

.card-container .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-container .item.front {
  position: absolute;
  transform: rotateY(0deg);
}

.card-container:hover .item.front {
  transform: rotateY(180deg);
}

.card-container .item.back {
  transform: rotateY(-180deg);
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;

  position: relative;
}

.text-content {
  position: absolute;
  top: 50%;
  color: white;
  font-size: 20px;
}

.card-container .item.back .img {
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.5);
}
.card-container:hover .item.back {
  transform: rotateY(0deg);
}
</style>
