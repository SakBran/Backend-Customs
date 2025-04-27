Backend
၁.အရင်ဆုံးModelဆောက်
၂.ဆောက်ထားတဲ့Modelကို DB Contextထဲသွားထည့်
၃.dotnet ef migrations add blahblahထည့် CMDထဲ Run(Blah ဆိုတာ သက်ဆိုင်တာထည့်ခိုင်းတာ။ညဏ်တအားမကောင်းနဲ့)
၄.dotnet ef database updateထည့် CMDထဲ Run
၅.Controller ကို UserControllerအတိုင်းကူး User Modelသုံးထားတဲ့နေရာမှာ နံပါတ်၂အဆင့်မှာထည့်ထားတဲ့Modelထည့်
၆.API ပိုင်းပြီးပြီ။

FrontEnd
၁.AdminAppထဲကိုသွား src/app/pagesထဲကနေ User folderကိုကူး
၂.နာမည်တွင်ပြင် Userနေရာမှာ Backendကဆောက်ထားတဲ့Model Nameတွေပြောင်း
၃.အဲ့အောက်မှာ Pageနဲ့ Listနဲ့ရှိတယ်။
၄.Listတွက်အရင်ပြောမယ်။api={'User'}ဆိုတဲ့နေရာ အဲ့ Userနေရာမှာ Controller Nameထည့်
၅.displayData={['name', 'password', 'permission', 'id']}အဲ့နေရာမှာ Backendမှာဆောက်ထားတဲ့ Model ကိုအစ စလုံးအသေးနဲ့ထည့်။ အကုန်မထည့်လဲရတယ် ပေါ်ချင်တာလောက်ထည့်။ အဲ့ဒါဆိုပြီးပြီ
၆.Pageအတွက်ပြောမယ်။ const APIURL = 'User'; အဲဒီနေရာကို Controller Nameထည့်
၇.Formထဲမှာပါတဲ့ Form.itemတွေအကုန်လုံးကို Text Box ဆိုText Boxဆိုင်တာပြန်ပြင်ထည့်။
၈.Form.Itemမှာပါတဲ့label="Name"နဲ့name="name"။ Labelကပေါ်မယ့်စာ။ Name က Modelမှာပါတဲ့ Attribute
၉.Route.tsxထဲမှာ အပေါ်ကပါတဲ့ Userအတိုင်းကူးပြီးရင်Backendကဆောက်ထားတဲ့Model Nameတွေပြောင်း
၁၀.SideNav.tsxထဲကနေconst items: MenuProps['items'] အဲ့ထဲသွားပြင် အလွယ်ဆုံးက User ဟာကူးပြီးသာပြင်လိုက်

To Run Project
API Runဖို့ကCMDကနေ.csprojရှိတဲ့နေရာကိုသွား ပြီးရင် dotnet runလို့ရိုက်
Frontend Run ဖို့က အပေါ်က .csproj ရှိတဲ့နေရာကနေ
CD AdminAppရိုက်
npm run startရိုက်ရပြီ

Login Username : root & Password: password
Terminalဘယ်လိုခေါ်ရမလဲမသိရင် Ctrl+` နှိပ် Vs codeမှာဆိုအောက်မှာပေါ်လာလိမ့်မယ်
