import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as jsonData from '../../jsonData/pollJsonData.json';

@Component({
  selector: 'app-poll',
  templateUrl: 'poll.page.html',
  styleUrls: ['poll.page.scss'],
})
export class PollPage {

  currentUser:any
  polls: any = []
  options: any = []
  modalVisibility: boolean = false;
  selected: any = null;
  selectedItem: any = null;
  totalAnswers: any = null;
  startSpinner: any = false
  showPopup: any = false;
  alertPopup: boolean = false;
  showLoginPopup: any = false;
  popupMessage: any = '';
  total: any = null
  percentages: any = []
  myArray: any = []
  public alertButtons = ['OK'];
  alert: boolean = false
  user: any = {}

  constructor(
    private alertController: AlertController,
    private sharing: SocialSharing,
    private menuCtrl: MenuController,
    ) {
      
  }

  ngOnInit() {
    this.startSpinner = true;
    this.getData();
  }

  getData() {
    const jsonDataNew = JSON.stringify(jsonData);
    const pollsData = JSON.parse(jsonDataNew);
    this.polls = pollsData.data.pollData
    for (let i = 0; i < pollsData.data.pollData.length; i++) {
      if (this.polls[i].poll_ans.length > 0) {
        this.polls[i].selectedOption = {
          capp_user_id: this.polls[i].poll_ans[0].capp_user_id,
          poll_id: this.polls[i].poll_ans[0].poll_id,
          options_id: this.polls[i].poll_ans[0].options_id,
        }
        this.polls[i].showPercentage = true;
        setTimeout(() => {
          this.startSpinner = false;
        }, 2000);
      }
      else {
        setTimeout(() => {
          this.startSpinner = false;
        }, 2000);
        this.polls[i].selectedOption = {
          capp_user_id: null,
          poll_id: null,
          options_id: null
        }
      }
    }
  }
  selectItems(item: any, id: any, i: any, polls:any, pollIndex:any) {
    this.polls[pollIndex].selectedOption.capp_user_id = this.user.id
    this.polls[pollIndex].selectedOption.poll_id = item.poll_id
    this.polls[pollIndex].selectedOption.options_id = item.id
  }
  submitPoll(item:any, pollIndex:any, items:any) {
    this.startSpinner = true
    this.total = 0;
      const data = {
        capp_user_id: this.user.id,
        poll_id: item.poll_id,
        options_id: item.id
      }
      this.polls[pollIndex].total_poll_count += 1;
      this.polls[pollIndex].options.map((item:any)=>{
        if(item.options_id === item.options_id){
          const newItem = item;
          newItem.poll_count += 1;
          return newItem;
        }
        return item;
      })

      if (item.options_id) {
        setTimeout(() => {
          this.startSpinner = false
          this.polls[pollIndex].showPercentage = true;
          this.showPopup = true;
          this.menuCtrl.enable(false)
        }, 2000);
      }
      if (!item.options_id) {
        setTimeout(() => {
          this.startSpinner = false
          this.menuCtrl.enable(false)
          this.showPopup = true;
        }, 2000);
      }

  }
  ionViewDidEnter() {
    this.getData();
  }
  sharePoll(item:any) {
    var options = {
      subject:item.poll_question,
      message: `Share the poll '${item.poll_question}' with your friends and familiers`,
      url: `https://pollcity.projectsofar.info/poll/${item.id}`,
      chooserTitle: item.poll_question,
    };
    console.log(options)
    this.sharing.shareWithOptions(options).then((response:any) => {
    })
  }
  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Select a valid option',
      message: 'You need to select a valid field for this pole!',
      buttons: ['OK'],
    });
    alert.present()
  }
  setPercentage(i:any) {
    if (this.total) {
      return `${Math.round((this.percentages[i].option_count / this.total) * 100)}%`
    } else {
      return '0%'
    }
  }
  setItem(item:any) {
    return Math.round(item)
  }
  closePopup() {
    this.showPopup = false
    this.menuCtrl.enable(true)
    this.alertPopup = false
    this.startSpinner = false
  }
  closeLoginPopup() {
    this.showLoginPopup = false;
    this.startSpinner = false
    this.menuCtrl.enable(true)
  }
  cropItem(item:any) {
    return item.slice(0, 40)
  }
}
