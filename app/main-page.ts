import { EventData, Label, Page, TextField } from '@nativescript/core'
import { HelloWorldModel } from './main-view-model'
import { downloadMedia, getDownloadURL } from './app'
export function navigatingTo(args: EventData) {
  const page = <Page>args.object
  page.bindingContext = new HelloWorldModel()
}


export async function execute(args) {
  const page = <Page>args.object.page
  const input = page.getViewById<TextField>("input")
  const result = page.getViewById<Label>("result")

  const url = input.text
  if (!url) return result.text = "Please enter a URL";

  result.text = "Fetching the video..."
  try {
    const response = await getDownloadURL(url)
    result.text = "Downloading..."
    downloadMedia(response)

  } catch (error) {
    result.text = "Download failed: " + error.message
  }
  
}