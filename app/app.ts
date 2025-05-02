/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application, Utils } from '@nativescript/core'


Application.android.on(Application.AndroidApplication.activityCreatedEvent, async (args) => {
    const intent = args.activity.getIntent();
    const action = intent.getAction();
    const type = intent.getType();

    if (action === android.content.Intent.ACTION_SEND && type === "text/plain") {
        const sharedText = intent.getStringExtra(android.content.Intent.EXTRA_TEXT);
        if (sharedText) {
            try {
                const response = await getDownloadURL(sharedText)
                downloadMedia(response)
                Application.android.foregroundActivity.finish();
            } catch (err) {
                showToast(err.message)
            }
        }
    }
});


Application.run({ moduleName: 'app-root' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/

export async function getDownloadURL(url: string): Promise<Response> {
    const request = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Api-Key ${API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    })
    //result.text = `Status: ${request.status} - ${request.statusText}\nRes: ${await request.text()}`

    const response = await request.json()
    if (request.status == 400) throw new Error(JSON.stringify(response["error"]))
    if (response["status"] == "picker") throw new Error("Picker not supported.");
    return response as Response
}

export async function downloadMedia({ url, filename }: Response) {
    const context = Utils.android.getApplicationContext()
    const request = new android.app.DownloadManager.Request(android.net.Uri.parse(url))

    request.setNotificationVisibility(android.app.DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
    request.setTitle("Downloading")
    request.setDescription(filename)
    request.setDestinationInExternalPublicDir(android.os.Environment.DIRECTORY_DOWNLOADS, filename)

    const dm = context.getSystemService(android.content.Context.DOWNLOAD_SERVICE) as android.app.DownloadManager
    const downloadId = dm.enqueue(request)
    console.log("Started downloading " + downloadId)
}

export function showToast(message: string) {
    const context = Application.android.context;
    android.widget.Toast.makeText(context, message, android.widget.Toast.LENGTH_LONG).show();
}

type Response = {
    status: "tunnel" | "redirect"
    url: string
    filename: string
}