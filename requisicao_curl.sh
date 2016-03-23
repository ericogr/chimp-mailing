#!/bin/sh
#exemplo:

curl --user apikey:<api-key> --request GET "https://us10.api.mailchimp.com/3.0/lists/b045c22232/members"
#curl --user apikey:<api-key> --request DELETE "https://us10.api.mailchimp.com/3.0/lists/b045c22232/members/ee9555afe707fd6766b60dd278325861"
#curl --user apikey:<api-key> --request GET "https://us10.api.mailchimp.com/3.0/lists/b045c22232/merge-fields"
#curl --user apikey:<api-key> --request GET "https://us10.api.mailchimp.com/3.0/lists/b045c22232/merge-fields/1"

curl \
 -H "Content-Type: application/json" \
 --user apikey:<api-key> \
 -X POST -d '{"status":"subscribed","email_address":"josedasilva@hotshit.com.br","merge_fields":{"FNAME":"José da Silva"}}' \
 "https://us10.api.mailchimp.com/3.0/lists/b045c22232/members"

