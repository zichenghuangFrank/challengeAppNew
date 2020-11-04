<template>
  <div id="app">
<!--    Layout reference: https://www.iviewui.com/components/layout-->
    <div class="layout">
      <Layout>
        <Header class="title">
          <h1>Weather Report</h1>
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="onMenuSelect">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  City
                </template>
                <MenuItem name="Beijing">Beijing</MenuItem>
                <MenuItem name="Shanghai">Shanghai</MenuItem>
              </Submenu>
            </Menu>
          </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>
<script>
  export default {
    name: "App",
    watch: {
      // Update page head
      $route: function () {
        let {title} = this.$route.meta;
        document.title = title;
      }
    },
    methods:{
      onMenuSelect:function (name) {
        if (name === "Beijing") {
          this.$router.push({
            name: 'Beijing'
          })
        }
        else if (name === "Shanghai") {
          this.$router.push({
            name: 'Shanghai'
          })
        }
      }
    }
  }
</script>
<style>
  html,
  body,
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
  .title {
    text-align: center;
  }
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    border-radius: 4px;
    height: 100%;
    overflow:auto;
  }

  .ivu-layout {
    display: flex;
    flex-direction: column;
    flex: auto;
    background: #f5f7f9;
    width: 100%;
    height: 100%;
  }
</style>