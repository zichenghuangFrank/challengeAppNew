<template>
<!--    Use the row to show details about Shanghai weather-->
    <div class="details">
        <Row type="flex" justify="center">
            <i-col>
                <h2>Basic Information</h2>
            </i-col>
        </Row>
        <Row type="flex" justify="center">
<!--            image reference: https://en.wikipedia.org/wiki/Shanghai-->
            <img src="../assets/Shanghai.jpeg" alt="Shanghai" height="30%" width="30%">
        </Row>
        <Row type="flex" justify="center">
            <i-col span="22" offset="1">
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
                let url = 'https://v0.yiketianqi.com/api?version=v61&appid=39425827&appsecret=cEgKfrw8&cityid=101020100';
                this.$axios.get(url).then(function(res) {
                    that.cityen= res.data.cityEn;
                    that.humidity = res.data.humidity;
                    that.pressure = res.data.pressure;
                    that.update_time = res.data.update_time;
                    that.visibility = res.data.visibility;
                    that.air_pm25 = res.data.air_pm25;
                    that.temperature = res.data.tem;
                    console.log(res);

                    // Get Date for storing data
                    that.date = res.data.date;
                    console.log(that.date);
                    console.log(res);

                    // If there is info in Cookie
                    if (that.$cookie.get('Shanghai')) {
                        let temp = that.$cookie.get('Shanghai').split("=");
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
                downloadLink.innerHTML = 'LINKTITLE'
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
                if (that.$cookie.get('Shanghai')) {
                    var info = that.$cookie.get('Shanghai');
                    history = info.split("=");
                }
                history.push("Date: " + that.date + ", " + "Update time: " + that.update_time + ', ' + "Temperature: "
                    + that.temperature + ', ' + "Humidity: " + that.humidity + ', ' + "Pressure: " + that.pressure + ', '
                    + "Visibility: " + that.visibility + ', ' + "Air (pm2.5): " + that.air_pm25 + '<br/>');
                var storeCookie = history.join("=");
                that.$cookie.set('Shanghai', storeCookie);
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

