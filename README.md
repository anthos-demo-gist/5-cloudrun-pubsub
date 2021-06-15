# Simple app to demonstrate the use of PubSub with Cloud Run

The original doc used can be found here : [Using Pub/Sub with Cloud Run tutorial](https://cloud.google.com/run/docs/tutorials/pubsub})

## 1. PubSub Setup

Run this code to create a topic on pubsub : 

```sh
gcloud pubsub topics create demoTopic
```

## 2. Deploy the samples

```sh
gcloud builds submit --tag gcr.io/anthos-bm-env/gopublish
gcloud run deploy publisher --image gcr.io/anthos-bm-env/gopublish
```
