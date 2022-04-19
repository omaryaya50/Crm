import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AnswerChoisesServiceService } from 'src/app/api.service/codes-service/answer-choises-service.service';
import { AnswerServiceService } from 'src/app/api.service/codes-service/answer-service.service';
import { VersionServiceService } from 'src/app/api.service/codes-service/version-service.service';
import { VersionQuestionAnswerServiceService } from 'src/app/api.service/codes-service/version-question-answer-service.service';
import { QuestionServiceService } from 'src/app/api.service/codes-service/question-service.service';
import { AnswerTypesServiceService } from 'src/app/api.service/codes-service/answer-types-service.service';
import { ProgSericeService } from 'src/app/api.service/prog-serice.service';
import { IQuestion } from 'src/app/Interfaces/codes-Interfaces/iquestion';
import { IAnswerChoiseContent } from 'src/app/Interfaces/codes-Interfaces/ianswer-choise-content';
import { IAnswer } from 'src/app/Interfaces/codes-Interfaces/ianswer';
import { IAnswerChoises } from 'src/app/Interfaces/codes-Interfaces/ianswer-choises';
import { Program } from 'src/app/Interfaces/Program.Interface';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  AddNewQuestion: boolean = false;
  QuestionContent: boolean = false;
  ProgramsList: boolean = false;
  QuestionList: boolean = false;
  AnswerList: boolean = false;
  AnswersTypesContent: boolean = false;
  ChooseFlage: boolean = false;
  RateFlag: boolean = false;
  NumbersFlag: boolean = false;
  AnswerContent: boolean = false;
  AnswerChoiseNotes: boolean = false;
  DeleteQuestionAnswer: boolean = false;
  SpecificAnswer: boolean = true;

  RequiredFlage: number;
  BackGroundinfo: number;
  PrevQuestion: number;
  PrevAnswer: number;
  QuesNotes: number;
  Attachment: number;
  Summary: number;
  Multiple: number;
  AnswerNote: number;
  SelectedAnsweChoiseIndex: number;
  RateType: number;

  SummaryID: number;
  SelectedProgramsList: any;


  DeletedElement: IAnswerChoiseContent
  AnswerChoiseContentItem: IAnswerChoiseContent;
  AnswerChoiseContentList: IAnswerChoiseContent[] = [];
  UpdatedAnswerChoiseContentList: IAnswerChoiseContent[] = [];

  AnswerTypes: any;
  Answers: any;
  Questions: any[] = [];
  Programs: any[] = [];
  VersionQuestionList: any;
  VersionQuestionElemnts: IQuestion[] = [];

  ChoisesQuestions: any[] = [];


  QuestionItems: IQuestion = {
    questionCode: 0,
    actualQuestionCode: 0,
    questionName: null,
    questionLatName: null,
    requiredYN: false,
    notesYN: false,
    attachmentYN: false,
    summaryYN: false,
    progId: null,
    dependsOnQuestionCode: null,
    answerCode: null
  };

  AnswerItem: IAnswer = {
    answersCode: 0,
    questionCode: null,
    typeCode: null,
    multipleYN: false,
    percentageYN: false,
    from: 0,
    to: 0,
  }

  RateTypesList = [{ Code: 1, Name: "Percentage" }, { Code: 2, Name: "Number" }];

  dropdownSettings2: IDropdownSettings = {};

  rowData: any;
  rowSelection = 'single';

  isSubmitted = false;
  public defaultColDef;
  private gridApi;
  public api: GridApi;
  title: string;
  modalRef: BsModalRef;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { headerName: this.Rtl ? 'الكود' : 'Version Code', field: 'versionActulCode', width: 150, sortable: true, filter: true },

    { headerName: this.Rtl ? 'الوصف العربى' : 'Version Name', field: 'versionName', width: 300, sortable: true, filter: true },

    { headerName: this.Rtl ? 'الوصف الانجليزى' : 'Version Lat Name', field: 'versionLatName', width: 300, sortable: true, filter: true }
  ];
  UpdateSelectedAnswerChoise: boolean;
  DeleteOption: boolean;
  dependsOnQuestionCodeAnswers: IAnswerChoises[];
  Program: Program[];


  VisitSummaryExists: boolean;
  public _IPrgPer:IPrgPer;



  constructor(public AnswerChoiseServ: AnswerChoisesServiceService, public AnswerServ: AnswerServiceService,
    public VersionServ: VersionServiceService, public VQAServ: VersionQuestionAnswerServiceService,
    public QuestionServ: QuestionServiceService, public AnswerTypeServ: AnswerTypesServiceService,
    private spinner: NgxSpinnerService
    , public ProgServ: ProgSericeService, private translate: TranslateService,
    private modalService: BsModalService, public _GroupPermissionService:GroupPermissionService,private route: ActivatedRoute,
    ) {
    this.defaultColDef = { resizable: true };
    this._IPrgPer=
    {
      delete:false,
      edit:false,
      excel:false,
      insert:false,
      print:false,
      progId:0,
      read:false,
      recordList:false,
      sysId:0,
      userId:0
    }
  }

  ngOnInit(): void {

    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'progId',
      textField: 'arabicName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.resetVersion();
    this.resetQuestion();
    this.resetAnswer();
    this.resetVQA();
    this.resetAnswerChoises(0, null, null, false);
    this.resetAnswerChoiseItem(null, null, 0);

    this.rowData = this.VersionServ.GetAlldata();

    this.AnswerTypeServ.GetAlldata().subscribe(res => {
      this.AnswerTypes = res;
    });

    this.Answers = this.AnswerServ.GetAlldata().subscribe(res => {
      this.Answers = res;

    });

    this.QuestionServ.GetAlldata().subscribe(res => {
      this.Questions = res;
    });

    this.ProgServ.getProg().subscribe(res => {

      res.forEach(element => {
        if (element.progId == 100900000 || element.progId == 100400000 || element.progId == 100101000) {
          this.Programs.push(element);
        }
      });
    });
    this.route.data.subscribe(data => {
      this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
       {
         this._IPrgPer=x;
       })
 
     });
  }


  DeleteAnswerChoise() {


    this.spinner.show();

    this.DeleteOption = true;

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.resetAnswerChoiseItem(null, null, 0);
    for (let i = 0; i < this.AnswerChoiseContentList.length; i++) {

      if (i != this.SelectedAnsweChoiseIndex) {
        this.UpdatedAnswerChoiseContentList.push(this.AnswerChoiseContentList[i]);

      }
    }




    let X = this.AnswerChoiseContentList.length;
    for (let i = 0; i < X; i++) {
      this.AnswerChoiseContentList.pop();

    }

    this.AnswerChoiseContentList = [...this.UpdatedAnswerChoiseContentList];

    this.UpdatedAnswerChoiseContentList = [];

  }

  DeleteQuestionAnwser() {
    this.VersionQuestionElemnts = [];
    if (confirm('Are you sure to delete')) {
      {
        this.VQAServ.DeleteQuestion(this.QuestionServ.Question.questionCode).subscribe(
          res => {

            this.AnswerChoiseServ.DeleteAnswer(this.AnswerServ.Answer.answersCode).subscribe(res => {
              this.AnswerServ.DeleteQuestion(this.QuestionServ.Question.questionCode).subscribe(res => {
                this.QuestionServ.Delete(this.QuestionServ.Question.questionCode).subscribe(res => {
                  this.AddNewQuestion = false;

                });
              });
            });
          });
      }
    }

  }

  onChangeSelectionAnswerType(selected) {

    this.AnswerServ.Answer.typeCode = parseInt(selected);

    this.NumbersFlag = false;
    if (selected == 2) {
      this.RateFlag = true;
      this.ChooseFlage = false;
      this.AnswerServ.Answer.multipleYN = false;

    }
    else if (selected == 3) {
      this.RateFlag = false;
      this.ChooseFlage = true;

      this.AnswerServ.Answer.percentageYN = false;
      this.AnswerServ.Answer.from = 0;
      this.AnswerServ.Answer.to = 0;
    }
    else {
      this.RateFlag = false;
      this.ChooseFlage = false;
      this.AnswerServ.Answer.multipleYN = false;
      this.AnswerServ.Answer.percentageYN = false;
      this.AnswerServ.Answer.from = 0;
      this.AnswerServ.Answer.to = 0;
    }
  }

  onItemChangeAnswerChoiseContentList(selected) {

    this.AnswerNote = 0;
    this.AnswerChoiseContentItem = this.AnswerChoiseContentList[selected];
    if (this.AnswerChoiseContentItem.notesYN) {
      this.AnswerNote = 1;
    }
    this.UpdateSelectedAnswerChoise = true;
    this.SelectedAnsweChoiseIndex = selected;

  }


  onItemChangeRateType(value) {
    if (parseInt(value) == 1) {
      this.AnswerServ.Answer.percentageYN = true;
      this.AnswerServ.Answer.from = 0;
      this.AnswerServ.Answer.to = 0;
      this.NumbersFlag = false;
    }
    else {
      this.AnswerServ.Answer.percentageYN = false;
      this.NumbersFlag = true;
    }
  }

  resetVersion() {
    this.VersionServ.GetMax().subscribe(res => {
      this.VersionServ.Version =
      {
        versionCode: 0,
        versionActulCode: res + 1,
        versionName: null,
        versionLatName: null,
        defult: false,
        asked: false,
        notActive:false,
      };
      this.gridApi?.deselectAll();

    });
  }

  resetQuestion() {
    this.QuestionServ.GetMax().subscribe(res => {
      this.QuestionServ.Question = {
        questionCode: 0,
        actualQuestionCode: res + 1,
        questionName: null,
        questionLatName: null,
        requiredYN: null,
        notesYN: false,
        summaryYN: false,
        attachmentYN: false,
        progId: null,
        dependsOnQuestionCode: null,
        answerCode: null
      }

    })
  }

  resetAnswer() {
    this.AnswerServ.Answer = {
      answersCode: 0,
      questionCode: null,
      typeCode: null,
      multipleYN: false,
      percentageYN: false,
      from: 0,
      to: 0,
    }
  }

  resetAnswerChoises(AC, ACLN, ACN, note) {
    this.AnswerChoiseServ.AnswerChoise = {
      answerChoiseCode: 0,
      answersCode: AC,
      answerChoiseLatName: ACLN,
      answerChoiseName: ACN,
      notesYN: note
    }
  }

  resetVQA() {
    this.VQAServ.VQA = {
      serial: 0,
      versionCode: null,
      questionCode: null,
    }
  }

  resetAnswerChoiseItem(Name, LatName, TF) {
    this.AnswerChoiseContentItem = {
      answerChoiseName: Name,
      answerChoiseLatName: LatName,
      notesYN: TF
    };
    this.AnswerNote = 2;
  }

  AddQuestion(template: TemplateRef<any>) {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.resetQuestion();
      this.resetAnswer();
      this.resetAnswerChoises(0, null, null, false);


      this.AddNewQuestion = true;
      this.QuestionContent = true;
      this.AnswersTypesContent = false;
      this.RateFlag = false;
      this.NumbersFlag = false;
      this.ChooseFlage = false;
      this.AnswerContent = false;
      this.AnswersTypesContent = false;
      this.ProgramsList = false;
      this.QuestionList = false;
      this.AnswerList = false;


      this.RequiredFlage = 2;
      this.BackGroundinfo = 2;
      this.PrevQuestion = 2;
      this.PrevAnswer = 2;
      this.QuesNotes = 2;
      this.Attachment = 2;
      this.Summary = 2;
      this.Multiple = 2;
      this.AnswerNote = 2;
      this.RateType = -1;

      this.VersionServ.Version = selectedRows[0];

    }
    else {
      alert('Must select A Version');
    }
  }

  UpdateVersion(template: TemplateRef<any>) {

    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.VersionServ.Version = selectedRows[0];
      this.title = 'Edit';
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert('Must select Record to edit');
    }
  }

  Addnewversion(template: TemplateRef<any>) {
    this.resetVersion();
    this.title = 'Add New Version';
    this.modalRef = this.modalService.show(template);
  }

  hide() {
    this.modalRef.hide();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.VersionServ.GetAlldata();
  }

  onSelectionChanged(params) {
    //let no=[];
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.VersionServ.Version = selectedRows[0]
      this.VersionQuestionElemnts = [];
      this.VQAServ.RetunAQuestionView(this.VersionServ.Version.versionCode).subscribe(res => {
        this.VersionQuestionElemnts = res;

        var SummaryR = this.VersionQuestionElemnts.filter(x => x.summaryYN == true);

        if (SummaryR.length == 0) {
          this.VisitSummaryExists = false;
          this.SummaryID = 0;
        }
        else {
          this.VisitSummaryExists = true;
          this.SummaryID = SummaryR[0].questionCode;
        }
      });
    }
  }


  DeleteVersion(index: number) {
    if (confirm('Are you sure to delete')) {
      {
        this.VQAServ.GetByVersion(index).subscribe(res => {
          res.forEach(element => {
            this.AnswerServ.GetByQuestion(element.questionCode).subscribe(res => {
              this.AnswerChoiseServ.DeleteAnswer(res.answersCode).subscribe(res => {
                this.AnswerServ.DeleteQuestion(element.questionCode).subscribe(res => {
                  this.QuestionServ.Delete(element.questionCode).subscribe();
                });
              });
            });
          });

          this.VQAServ.DeleteVersion(index).subscribe((data) => {
            this.VersionServ.Delete(index).subscribe(res => {
              this.rowData = this.VersionServ.GetAlldata();
              this.hide();
            });

          });
        })
      }
    }
  }

  onSubmit(f: NgForm) {
    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {
      if (this.VersionServ.Version.versionCode == null ||
        // tslint:disable-next-line: triple-equals
        this.VersionServ.Version.versionCode == 0) {

        this.VersionServ.postdata().subscribe(res => {
          this.rowData = this.VersionServ.GetAlldata();
          this.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);

        }
          , err => {
            console.log(err);
            setTimeout(() => {

              this.spinner.hide();
            }, 2000);
          });

      }
      else {
        this.VersionServ.putdata().subscribe(res => {
          this.rowData = this.VersionServ.GetAlldata();
          this.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
          , err => {
            console.log(err);
            setTimeout(() => {
              this.spinner.hide();
            }, 2000);
          });
      }
    }
    setTimeout(() => {

      this.spinner.hide();
    }, 1000);

  }

  onItemSelect4(item: any) {
    this.SelectedProgramsList.forEach(element => {

    });
  }

  NewQuestion() {

    this.VersionQuestionElemnts = [];
    this.QuestionServ.postdata().subscribe(res => {

      this.QuestionItems = res;
      this.AnswerServ.Answer.questionCode = this.QuestionItems.questionCode;
      this.VQAServ.VQA.versionCode = this.VersionServ.Version.versionCode;
      this.VQAServ.VQA.questionCode = this.QuestionItems.questionCode;
      this.VQAServ.postdata().subscribe(res => {
        this.AnswerServ.postdata().subscribe(
          res => {
            this.AnswerItem = res;
            this.SaveChoiseseList();
          }
        );
      });

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
      , err => {
        console.log(err);
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      });
  }

  SaveChoiseseList() {
    if (this.AnswerChoiseContentList.length > 0) {
      this.AnswerChoiseContentList.forEach(element => {

        this.resetAnswerChoises(this.AnswerItem.answersCode, element.answerChoiseLatName
          , element.answerChoiseName, element.notesYN);
        this.AnswerChoiseServ.postdata().subscribe(
          res => {
            this.resetAnswerChoises(0, null, null, false);
          }
        );
      });

      this.AnswerChoiseContentList = [];

    }

  }

  UpdateQuestion() {
    this.VersionQuestionElemnts = [];
    this.QuestionServ.putdata().subscribe(res => {
      this.AnswerServ.putdata().subscribe(
        res => {
          this.AnswerItem = res;

          this.AnswerChoiseServ.DeleteAnswer(this.AnswerItem.answersCode).subscribe(res => {
            if (this.AnswerServ.Answer.typeCode == 3) { this.SaveChoiseseList(); }

          });

        });

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
      , err => {
        console.log(err);
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      });

  }

  onSubmitQuestionAnswer(f: NgForm) {
    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {
      if (this.QuestionServ.Question.questionCode == null ||

        this.QuestionServ.Question.questionCode == 0) {
        this.NewQuestion();
      }
      else {

        this.UpdateQuestion();
      }
      setTimeout(() => {

        this.spinner.hide();
      }, 1000);
      this.AddNewQuestion = false;
    }


  }

  onSubmitAnswerChoises(f: NgForm) {

    if (!this.DeleteOption) {

      this.AnswerChoiseContentItem.notesYN = this.AnswerChoiseNotes;
      this.spinner.show();
      if (this.UpdateSelectedAnswerChoise) {
        this.AnswerChoiseContentList[this.SelectedAnsweChoiseIndex] = this.AnswerChoiseContentItem;
        this.UpdateSelectedAnswerChoise = false;

      }
      else {
        this.AnswerChoiseContentList.push(this.AnswerChoiseContentItem);
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      this.resetAnswerChoiseItem(null, null, 0);

    }

  }

  ShowQuestionContent() {
    this.QuestionContent = !this.QuestionContent;
  }

  ShowAnswerTypes() {
    this.AnswersTypesContent = !this.AnswersTypesContent;

  }

  ShowAnswerContent() {
    this.AnswerContent = !this.AnswerContent;
  }

  onChangeSelectionPrograms(selected) {

    this.QuestionServ.Question.progId = parseInt(selected);
  }

  onChangeSelectionSelectedQuestion(selected) {
    this.QuestionServ.Getone(selected).subscribe(res => {
      this.QuestionServ.Question = res;
      this.AnswerServ.GetByQuestion(this.QuestionServ.Question.questionCode).subscribe(
        res2 => {
          this.AnswerServ.Answer = res2;
          this.SetTheQuestionAnswer();
        });
    });
  }

  SetTheQuestionAnswer() {

    this.DeleteQuestionAnswer = true;
    this.AddNewQuestion = true;
    this.QuestionContent = true;
    this.AnswersTypesContent = true;
    this.RequiredFlage = 0;
    if (this.QuestionServ.Question.requiredYN) {
      this.RequiredFlage = 1;
    }
    this.BackGroundinfo = 0;
    if (this.QuestionServ.Question.progId != null) {
      this.BackGroundinfo = 1;
      this.ProgramsList = true;
    }
    this.PrevQuestion = 0;
    if (this.QuestionServ.Question.dependsOnQuestionCode != null) {
      this.PrevQuestion = 1;
      this.QuestionList = true;
    }
    this.PrevAnswer = 0;
    if (this.QuestionServ.Question.answerCode != null) {
      this.PrevAnswer = 1;
      this.AnswerList = true;
    }
    this.QuesNotes = 0;
    if (this.QuestionServ.Question.notesYN) {
      this.QuesNotes = 1;
    }

    this.Summary = 0;
    if (this.QuestionServ.Question.summaryYN) {
      this.Summary = 1;
    }

    this.Attachment = 0;
    if (this.QuestionServ.Question.attachmentYN) {
      this.Attachment = 1;
    }
    if (this.AnswerServ.Answer.typeCode == 2) {
      this.RateType = 1;
      this.RateFlag = true;
      this.ChooseFlage = false;
      if (!this.AnswerServ.Answer.percentageYN) {
        this.NumbersFlag = true;
        this.RateType = 2;

      }
    }
    else if (this.AnswerServ.Answer.typeCode == 3) {
      this.ChooseFlage = true;
      this.RateFlag = false;
      this.Multiple = 0;
      if (this.AnswerServ.Answer.multipleYN) {
        this.Multiple = 1;
      }
      this.AnswerContent = true;
      this.AnswerChoiseServ.GetByAnswer(this.AnswerServ.Answer.answersCode).subscribe(
        res => {
          this.AnswerChoiseContentList = res;
        });

    }

  }

  onChangeSelectionQuestion(selected) {
    this.QuestionServ.Question.dependsOnQuestionCode = parseInt(selected);
    this.AnswerServ.GetByQuestion(selected).subscribe(
      res => {
        if (res.typeCode == 3) {
          this.SpecificAnswer = true;
          this.AnswerChoiseServ.GetByAnswer(res.answersCode).subscribe(
            res => {
              this.dependsOnQuestionCodeAnswers = res;
            });
        }

      }
    );


  }

  onChangeSelectionAnswer(selected) {
    this.QuestionServ.Question.answerCode = parseInt(selected);
  }

  CancelSave() {
    this.AddNewQuestion = false;
    this.resetQuestion();
    this.resetAnswer();
    this.resetAnswerChoises(0, null, null, false);
  }

  //#region YES/No Questions
  YesMultiple() {
    this.AnswerServ.Answer.multipleYN = true;
    this.Multiple = 1;
  }

  NoMultiple() {
    this.AnswerServ.Answer.multipleYN = false;
    this.Multiple = 0;
  }

  YesRequired() {
    this.QuestionServ.Question.requiredYN = true;
    this.RequiredFlage = 1;
  }

  NotRequired() {
    this.QuestionServ.Question.requiredYN = false;
    this.RequiredFlage = 0;
  }

  YesAnotherQuestion() {
    this.QuestionList = true;
    this.SpecificAnswer = false;
    this.PrevQuestion = 1;
  }

  NoAnotherQuestion() {

    this.QuestionList = false;

    this.SpecificAnswer = false;
    this.QuestionServ.Question.dependsOnQuestionCode = null;
    this.QuestionServ.Question.answerCode = null;
    this.PrevQuestion = 0;
  }

  YesProgram() {
    this.ProgramsList = true;
    this.BackGroundinfo = 1;
  }

  NoProgram() {
    this.QuestionServ.Question.progId = null;
    this.ProgramsList = false;
    this.BackGroundinfo = 0;
  }

  YesQuestionNotes() {
    this.QuestionServ.Question.notesYN = true;
    this.QuesNotes = 1;
  }

  NoQuestionNotes() {
    this.QuestionServ.Question.notesYN = false;
    this.QuesNotes = 0;
  }

  YesAnswerNotes() {
    this.AnswerChoiseNotes = true;
    this.AnswerNote = 1;
  }

  NoAnswerNotes() {
    this.AnswerChoiseNotes = false;
    this.AnswerNote = 0;
  }

  YesAttachment() {
    this.QuestionServ.Question.attachmentYN = true;
    this.Attachment = 1;
  }



  NoAttachment() {
    this.Attachment = 0;
    this.QuestionServ.Question.attachmentYN = false;
  }

  YesSummary() {
    this.QuestionServ.Question.summaryYN = true;
    this.Summary = 1;
  }

  NoSummary() {
    this.QuestionServ.Question.summaryYN = false;
    this.Summary = 0;
  }

  YesSpecificAnswer() {
    this.AnswerList = true;
    this.PrevAnswer = 1;
  }

  NoSpecificAnswer() {
    this.QuestionServ.Question.answerCode = null;
    this.AnswerList = false;
    this.PrevAnswer = 0;
  }

  //#endregion

}

