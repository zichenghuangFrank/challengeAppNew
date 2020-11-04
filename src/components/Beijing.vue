<template>
<!--    Use the row to show details about Beijing weather-->
    <div class="details">
        <Row type="flex" justify="center">
            <i-col>
                <h2>Basic Information</h2>
            </i-col>
        </Row>
        <Row type="flex" justify="center">
<!--            image reference: https://www.queensu.ca/innovationcentre/global-network-node-beijing-->
            <img src="../assets/Beijing.jpeg" alt="Beijing" height="30%" width="30%">
        </Row>
        <Row type="flex" justify="center">
            <i-col offset="1" span="22">
                <Divider></Divider>
            </i-col>
        </Row>
        <div class="information">
            <Row>
                <i-col offset="5" span="4">
                    city:{{cityen}}
                </i-col>
                <i-col span="4">
                    Date:{{date}}
                </i-col>
                <i-col span="4">
                    UpdateTime:{{update_time}}
                </i-col>
                <i-col span="4">
                    temperature:{{temperature}}
                </i-col>
            </Row>
            <br/>
            <Row>
                <i-col offset="5" span="4">
                    visibility:{{visibility}}
                </i-col>
                <i-col span="4">
                    humidity:{{humidity}}
                </i-col>
                <i-col span="4">
                    pressure:{{pressure}}
                </i-col>
                <i-col span="4">
                    air_pm25:{{air_pm25}}
                </i-col>
            </Row>
        </div>
        <br/>
<!--        Click the 'Save' button to save data in Cookie-->
        <Row type="flex" justify="center">
            <i-col>
                <Button type="primary" @click="saveCookie">Save</Button>
            </i-col>
        </Row>
        <br/>
<!--        Click the 'Download' button to save and download current data-->
        <Row type="flex" justify="center">
            <i-col>
                <Button type="primary" @click="saveData">Download</Button>
            </i-col>
        </Row>
        <br/>
<!--        Confirm Info-->
        <Row type="flex" justify="center">
            <i-col>
                <div>{{confirmInfo}}</div>
            </i-col>
        </Row>
        <br/>
<!--        Show the content in Cookie-->
        <div class="history" v-html="previousData"></div>

    </div>
</template>

<script>
    export default {
        name: "details",
        data() {
            return {
                date: '',
                air_pm25: '',
                cityen: '',
                humidity: '',
                pressure: '',
                update_time: '',
                visibility: '',
                temperature: '',
                confirmInfo: '',
                previousData: ''
            }
        },
        created() {
            this.getWeatherReport();
        },
        methods:{
            getWeatherReport() {
                let that = this;
                let url = 'https://v0.yiketianqi.com/api?version=v61&appid=39425827&appsecret=cEgKfrw8&cityid=101010100';
                this.$axios.get(url).then(function(res){
                    that.cityen= res.data.cityEn;
                    that.humidity = res.data.humidity;
                    that.pressure = res.data.pressure;
                    that.update_time = res.data.update_time;
                    that.visibility = res.data.visibility;
                    that.air_pm25 = res.data.air_pm25;
                    that.temperature = res.data.tem;

                    // Get Date for storing data
                    that.date = res.data.date;
                    console.log(that.date);
                    console.log(res);

                    // If there is info in Cookie
                    if (that.$cookie.get('Beijing')) {
                        let temp = that.$cookie.get('Beijing').split("=");
                        for (let i = 0; i < temp.length; i ++) {
                            that.previousData += temp[i];
                            console.log(that.previousData);
                        }
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            },
            saveData() {
                var textToWrite = "City: " + this.cityen + '\n' + "Update time: " + this.update_time + '\n' + "Temperature: "
                    + this.temperature + '\n' + "Humidity: " + this.humidity + '\n' + "Pressure: " + this.pressure + '\n'
                    + "Visibility: " + this.visibility + '\n' + "Air (pm2.5): " + this.air_pm25;
                // preserving line breaks
                var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
                // filename to save as
                var fileNameToSaveAs = this.cityen + '_WeatherReport.txt';
                var downloadLink = document.createElement('a');
                downloadLink.download = fileNameToSaveAs;
                // hidden link title name
                downloadLink.innerHTML = 'LINKTITLE';
                window.URL = window.URL || window.webkitURL;
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
                downloadLink.click();
            },
            saveCookie() {
                let that = this;
                var history = [];
                // If the cookie of storing information is not null
                if (that.$cookie.get('Beijing')) {
                    var info = that.$cookie.get('Beijing');
                    history = info.split("=");
                }
                history.push("Date: " + that.date + ", " + "Update time: " + that.update_time + ', ' + "Temperature: "
                    + that.temperature + ', ' + "Humidity: " + that.humidity + ', ' + "Pressure: " + that.pressure + ', '
                    + "Visibility: " + that.visibility + ', ' + "Air (pm2.5): " + that.air_pm25 + '<br/>');
                var storeCookie = history.join("=");
                that.$cookie.set('Beijing', storeCookie);
                that.confirmInfo = "Saved";
            }
        }
    }
</script>

<style scoped>
    .details{
        margin-top: 20px;
    }
    .history{
        text-align: center;
    }
</style>
