'use strict'


/**
 * Encrypting the naughty words, since id rather not have them floating around in
 * anyones computer. These are just Base64 encoded censored words, which can be
 * decrypted using: new Buffer( word, 'base64' ).toString('ascii')
 *
 * @type {array}
 */
exports.censored = [
    'YW51cw==','YXJzZQ==','YXJzZWhvbGU=','YXNz','YXNzLWhhdA==','YXNzLWphYmJlcg==','YXNzLXBpcmF0ZQ==','YXNzYmFn',
    'YXNzYmFuZGl0','YXNzYmFuZ2Vy','YXNzYml0ZQ==','YXNzY2xvd24=','YXNzY29jaw==','YXNzY3JhY2tlcg==','YXNzZXM=',
    'YXNzZmFjZQ==','YXNzZnVjaw==','YXNzZnVja2Vy','YXNzZ29ibGlu','YXNzaGF0','YXNzaGVhZA==','YXNzaG9sZQ==','YXNzaG9wcGVy',
    'YXNzamFja2Vy','YXNzbGljaw==','YXNzbGlja2Vy','YXNzbW9ua2V5','YXNzbXVuY2g=','YXNzbXVuY2hlcg==','YXNzbmlnZ2Vy',
    'YXNzcGlyYXRl','YXNzc2hpdA==','YXNzc2hvbGU=','YXNzc3Vja2Vy','YXNzd2Fk','YXNzd2lwZQ==','YXh3b3VuZA==','YmFtcG90',
    'YmFzdGFyZA==','YmVhbmVy','Yml0Y2g=','Yml0Y2hhc3M=','Yml0Y2hlcw==','Yml0Y2h0aXRz','Yml0Y2h5','YmxvdyBqb2I=',
    'Ymxvd2pvYg==','Ym9sbG9ja3M=','Ym9sbG94','Ym9uZXI=','YnJvdGhlcmZ1Y2tlcg==','YnVsbHNoaXQ=','YnVtYmxlZnVjaw==',
    'YnV0dCBwbHVn','YnV0dC1waXJhdGU=','YnV0dGZ1Y2th','YnV0dGZ1Y2tlcg==','Y2FtZWwgdG9l','Y2FycGV0bXVuY2hlcg==',
    'Y2hlc3RpY2xl','Y2hpbmM=','Y2hpbms=','Y2hvYWQ=','Y2hvZGU=','Y2xpdA==','Y2xpdGZhY2U=','Y2xpdGZ1Y2s=',
    'Y2x1c3RlcmZ1Y2s=','Y29jaw==','Y29ja2Fzcw==','Y29ja2JpdGU=','Y29ja2J1cmdlcg==','Y29ja2ZhY2U=','Y29ja2Z1Y2tlcg==',
    'Y29ja2hlYWQ=','Y29ja2pvY2tleQ==','Y29ja2tub2tlcg==','Y29ja21hc3Rlcg==','Y29ja21vbmdsZXI=','Y29ja21vbmdydWVs',
    'Y29ja21vbmtleQ==','Y29ja211bmNoZXI=','Y29ja25vc2U=','Y29ja251Z2dldA==','Y29ja3NoaXQ=','Y29ja3NtaXRo','Y29ja3Ntb2tl',
    'Y29ja3Ntb2tlcg==','Y29ja3NuaWZmZXI=','Y29ja3N1Y2tlcg==','Y29ja3dhZmZsZQ==','Y29vY2hpZQ==','Y29vY2h5','Y29vbg==',
    'Y29vdGVy','Y3JhY2tlcg==','Y3Vt','Y3VtYnViYmxl','Y3VtZHVtcHN0ZXI=','Y3VtZ3V6emxlcg==','Y3Vtam9ja2V5','Y3Vtc2x1dA==',
    'Y3VtdGFydA==','Y3Vubmll','Y3VubmlsaW5ndXM=','Y3VudA==','Y3VudGFzcw==','Y3VudGZhY2U=','Y3VudGhvbGU=',
    'Y3VudGxpY2tlcg==','Y3VudHJhZw==','Y3VudHNsdXQ=','ZGFnbw==','ZGFtbg==','ZGVnZ28=','ZGljaw==','ZGljay1zbmVlemU=',
    'ZGlja2JhZw==','ZGlja2JlYXRlcnM=','ZGlja2ZhY2U=','ZGlja2Z1Y2s=','ZGlja2Z1Y2tlcg==','ZGlja2hlYWQ=','ZGlja2hvbGU=',
    'ZGlja2p1aWNl','ZGlja21pbGs=','ZGlja21vbmdlcg==','ZGlja3M=','ZGlja3NsYXA=','ZGlja3N1Y2tlcg==','ZGlja3N1Y2tpbmc=',
    'ZGlja3RpY2tsZXI=','ZGlja3dhZA==','ZGlja3dlYXNlbA==','ZGlja3dlZWQ=','ZGlja3dvZA==','ZGlrZQ==','ZGlsZG8=',
    'ZGlwc2hpdA==','ZG9vY2hiYWc=','ZG9va2ll','ZG91Y2hl','ZG91Y2hlLWZhZw==','ZG91Y2hlYmFn','ZG91Y2hld2FmZmxl','ZHVtYXNz',
    'ZHVtYiBhc3M=','ZHVtYmFzcw==','ZHVtYmZ1Y2s=','ZHVtYnNoaXQ=','ZHVtc2hpdA==','ZHlrZQ==','ZmFn','ZmFnYmFn','ZmFnZnVja2Vy',
    'ZmFnZ2l0','ZmFnZ290','ZmFnZ290Y29jaw==','ZmFndGFyZA==','ZmF0YXNz','ZmVsbGF0aW8=','ZmVsdGNo','ZmxhbWVy','ZnVjaw==',
    'ZnVja2Fzcw==','ZnVja2JhZw==','ZnVja2JveQ==','ZnVja2JyYWlu','ZnVja2J1dHQ=','ZnVja2J1dHRlcg==','ZnVja2Vk','ZnVja2Vy',
    'ZnVja2Vyc3Vja2Vy','ZnVja2ZhY2U=','ZnVja2hlYWQ=','ZnVja2hvbGU=','ZnVja2lu','ZnVja2luZw==','ZnVja251dA==','ZnVja251dHQ=',
    'ZnVja29mZg==','ZnVja3M=','ZnVja3N0aWNr','ZnVja3RhcmQ=','ZnVja3RhcnQ=','ZnVja3Vw','ZnVja3dhZA==','ZnVja3dpdA==',
    'ZnVja3dpdHQ=','ZnVkZ2VwYWNrZXI=','Z2F5','Z2F5YXNz','Z2F5Ym9i','Z2F5ZG8=','Z2F5ZnVjaw==','Z2F5ZnVja2lzdA==','Z2F5bG9yZA==',
    'Z2F5dGFyZA==','Z2F5d2Fk','Z29kZGFtbg==','Z29kZGFtbml0','Z29vY2g=','Z29vaw==','Z3Jpbmdv','Z3VpZG8=','aGFuZGpvYg==',
    'aGFyZCBvbg==','aGVlYg==','aGVsbA==','aG8=','aG9l','aG9tbw==','aG9tb2R1bWJzaGl0','aG9ua2V5','aHVtcGluZw==','amFja2Fzcw==',
    'amFnb2Zm','amFw','amVyayBvZmY=','amVya2Fzcw==','amlnYWJvbw==','aml6eg==','anVuZ2xlIGJ1bm55','anVuZ2xlYnVubnk=',
    'a2lrZQ==','a29vY2g=','a29vdGNo','a3JhdXQ=','a3VudA==','a3lrZQ==','bGFtZWFzcw==','bGFyZGFzcw==','bGVzYmlhbg==',
    'bGVzYm8=','bGV6emll','bWNmYWdnZXQ=','bWljaw==','bWluZ2U=','bW90aGFmdWNrYQ==','bW90aGFmdWNraW5cJw==',
    'bW90aGVyZnVja2Vy','bW90aGVyZnVja2luZw==','bXVmZg==','bXVmZmRpdmVy','bXVuZ2luZw==','bmVncm8=','bmlnYWJvbw==',
    'bmlnZ2E=','bmlnZ2Vy','bmlnZ2Vycw==','bmlnbGV0','bnV0IHNhY2s=','bnV0c2Fjaw==','cGFraQ==','cGFub29jaA==','cGVja2Vy',
    'cGVja2VyaGVhZA==','cGVuaXM=','cGVuaXNiYW5nZXI=','cGVuaXNmdWNrZXI=','cGVuaXNwdWZmZXI=','cGlzcw==','cGlzc2Vk',
    'cGlzc2VkIG9mZg==','cGlzc2ZsYXBz','cG9sZXNtb2tlcg==','cG9sbG9jaw==','cG9vbg==','cG9vbmFuaQ==','cG9vbmFueQ==',
    'cG9vbnRhbmc=','cG9yY2ggbW9ua2V5','cG9yY2htb25rZXk=','cHJpY2s=','cHVuYW5ueQ==','cHVudGE=','cHVzc2llcw==','cHVzc3k=',
    'cHVzc3lsaWNraW5n','cHV0bw==','cXVlZWY=','cXVlZXI=','cXVlZXJiYWl0','cXVlZXJob2xl','cmVub2I=','cmltam9i','cnVza2k=',
    'c2FuZCBuaWdnZXI=','c2FuZG5pZ2dlcg==','c2NobG9uZw==','c2Nyb3Rl','c2hpdA==','c2hpdGFzcw==','c2hpdGJhZw==',
    'c2hpdGJhZ2dlcg==','c2hpdGJyYWlucw==','c2hpdGJyZWF0aA==','c2hpdGNhbm5lZA==','c2hpdGN1bnQ=','c2hpdGRpY2s=',
    'c2hpdGZhY2U=','c2hpdGZhY2Vk','c2hpdGhlYWQ=','c2hpdGhvbGU=','c2hpdGhvdXNl','c2hpdHNwaXR0ZXI=','c2hpdHN0YWlu',
    'c2hpdHRlcg==','c2hpdHRpZXN0','c2hpdHRpbmc=','c2hpdHR5','c2hpeg==','c2hpem5pdA==','c2thbms=','c2tlZXQ=',
    'c2t1bGxmdWNr','c2x1dA==','c2x1dGJhZw==','c21lZw==','c25hdGNo','c3BpYw==','c3BpY2s=','c3Bsb29nZQ==','c3Bvb2s=',
    'dGVzdGljbGU=','dGh1bmRlcmN1bnQ=','dGl0','dGl0ZnVjaw==','dGl0cw==','dGl0dHlmdWNr','dHdhdA==','dHdhdGxpcHM=',
    'dHdhdHM=','dHdhdHdhZmZsZQ==','dW5jbGVmdWNrZXI=','dmEtai1q','dmFn','dmFnaW5h','dmFqYXlqYXk=','dmpheWpheQ==',
    'd2Fuaw==','d2Fua2pvYg==','d2V0YmFjaw==','d2hvcmU=','d2hvcmViYWc=','d2hvcmVmYWNl','d29w'
]

/**
 * List of uncountable nouns in the English language
 *
 * @author https://www.englishclub.com/vocabulary/nouns-uncountable-list.htm
 * @type {array}
 */
exports.uncountable = [
    'access', 'accommodation', 'adulthood', 'advertising', 'advice', 'aggression', 'aid', 'air', 'alcohol', 'anger',
    'applause', 'arithmetic', 'art', 'assistance', 'athletics', 'attention', 'bacon', 'baggage', 'ballet', 'beef', 
    'beer', 'biology', 'blood', 'botany', 'bread', 'business', 'butter', 'carbons', 'cardboard', 'cash', 'chalk', 
    'chaos', 'cheese', 'chess', 'childhood', 'clothing', 'coal', 'coffee', 'commerce', 'compassion', 'comprehension', 
    'content', 'corruption', 'cotton', 'courage', 'currency', 'damage', 'dancing', 'danger', 'data', 'delight', 
    'dessert', 'dignity', 'dirt', 'distribution', 'dust', 'economics', 'education', 'electricity', 'employment', 
    'energy', 'engineering', 'enjoyment', 'entertainment', 'envy', 'equipment', 'ethics', 'evidence', 'evolution', 
    'failure', 'faith', 'fame', 'fiction', 'flour', 'flu', 'food', 'freedom', 'fruit', 'fuel', 'fun', 'furniture', 
    'garbage', 'garlic', 'gas', 'genetics', 'glass', 'gold', 'golf', 'gossip', 'grammar', 'grass', 'gratitude', 'grief', 
    'ground', 'guilt', 'gymnastics', 'hair', 'happiness', 'hardware', 'harm', 'hate', 'hatred', 'health', 'heat', 
    'height', 'help', 'homework', 'honesty', 'honey', 'hospitality', 'housework', 'humour', 'hunger', 'hydrogen', 'ice', 
    'ice cream', 'importance', 'inflation', 'information', 'injustice', 'innocence', 'intelligence', 'iron', 'irony', 
    'jam', 'jealousy', 'jelly', 'joy', 'judo', 'juice', 'justice', 'karate', 'kindness', 'knowledge', 'labour', 'lack', 
    'land', 'laughter', 'lava', 'leather', 'leisure', 'lightening', 'linguistics', 'literature', 'litter', 'livestock', 
    'logic', 'loneliness', 'love', 'luck', 'luggage', 'machinery', 'magic', 'mail', 'management', 'mankind', 'marble', 
    'mathematics', 'mayonnaise', 'measles', 'meat', 'metal', 'methane', 'milk', 'money', 'mud', 'music', 'nature', 
    'news', 'nitrogen', 'nonsense', 'nurture', 'nutrition', 'obedience', 'obesity', 'oil', 'oxygen', 'paper', 'passion', 
    'pasta', 'patience', 'permission', 'physics', 'poetry', 'pollution', 'poverty', 'power', 'pride', 'production', 
    'progress', 'pronunciation', 'psychology', 'publicity', 'punctuation', 'quality', 'quantity', 'quartz', 'racism', 
    'rain', 'recreation', 'relaxation', 'reliability', 'research', 'respect', 'revenge', 'rice', 'room', 'rubbish', 
    'rum', 'safety', 'salad', 'salt', 'sand', 'satire', 'scenery', 'seafood', 'seaside', 'shame', 'shopping', 'silence', 
    'sleep', 'smoke', 'smoking', 'snow', 'soap', 'software', 'soil', 'sorrow', 'soup', 'speed', 'spelling', 'sport', 
    'steam', 'strength', 'stuff', 'stupidity', 'success', 'sugar', 'sunshine', 'symmetry', 'tea', 'tennis', 'thirst', 
    'thunder', 'timber', 'time', 'toast', 'tolerance', 'trade', 'traffic', 'transportation', 'travel', 'trust', 
    'understanding', 'underwear', 'unemployment', 'unity', 'usage', 'validity', 'veal', 'vegetation', 'vegetarianism', 
    'vengeance', 'violence', 'vision', 'vitality', 'warmth', 'water', 'wealth', 'weather', 'weight', 'welfare', 'wheat', 
    'whisky', 'whiskey', 'width', 'wildlife', 'wine', 'wisdom', 'wood', 'wool', 'work', 'yeast', 'yoga', 'youth', 'zinc', 
    'zoology'
]