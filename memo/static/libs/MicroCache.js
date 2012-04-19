


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>jeromeetienne/MicroCache.js</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

    
    

    <meta content="authenticity_token" name="csrf-param" />
<meta content="tutjoGXwMpRVBFmFX3aL8ohwcHh1qif7ruvkl9YGr7I=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github-28c5222e349e8368a32d88dcc4734c5f5b7787eb.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github2-30d147fc8dd43beb5d7ea3321dd28b6aedc0969b.css" media="screen" rel="stylesheet" type="text/css" />
    

    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/jquery-78fea2420d2e2924cb02acf5821d5cba5bc639d1.js" type="text/javascript"></script>
    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/github-c0cb0b08a47dd52fd5538b06b656ac248f3eff0d.js" type="text/javascript"></script>
    

      <link rel='permalink' href='/jeromeetienne/MicroCache.js/tree/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7'>
    <meta property="og:title" content="MicroCache.js"/>
    <meta property="og:type" content="githubog:gitrepository"/>
    <meta property="og:url" content="https://github.com/jeromeetienne/MicroCache.js"/>
    <meta property="og:image" content="https://a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-140.png?1329275856"/>
    <meta property="og:site_name" content="GitHub"/>
    <meta property="og:description" content="MicroCache.js - micro library to handle in-memory cache (works in node+browser)"/>

    <meta name="description" content="MicroCache.js - micro library to handle in-memory cache (works in node+browser)" />
  <link href="https://github.com/jeromeetienne/MicroCache.js/commits/master.atom" rel="alternate" title="Recent Commits to MicroCache.js:master" type="application/atom+xml" />

  </head>


  <body class="logged_in   vis-public env-production " data-blob-contribs-enabled="yes">
    <div id="wrapper">

    
    
    

      <div id="header" class="true clearfix">
        <div class="container clearfix">
          <a class="site-logo" href="https://github.com/">
            <!--[if IE]>
            <img alt="GitHub" class="github-logo" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7.png?1323882717" />
            <img alt="GitHub" class="github-logo-hover" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7-hover.png?1324325358" />
            <![endif]-->
            <img alt="GitHub" class="github-logo-4x" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x.png?1323882717" />
            <img alt="GitHub" class="github-logo-4x-hover" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x-hover.png?1324325358" />
          </a>

              
    <div class="topsearch ">
<form accept-charset="UTF-8" action="/search" id="top_search_form" method="get"><input name="utf8" type="hidden" value="&#x2713;" />        <a href="/search" class="advanced-search tooltipped downwards" title="Advanced Search"><span class="mini-icon advanced-search"></span></a>
        <div class="search placeholder-field js-placeholder-field">
          <label class="placeholder" for="global-search-field">Search…</label>
          <input type="text" class="search my_repos_autocompleter" id="global-search-field" name="q" results="5" spellcheck="false" autocomplete="off" data-autocomplete="my-repos-autocomplete">
          <div id="my-repos-autocomplete" class="autocomplete-results">
            <ul class="js-navigation-container"></ul>
          </div>
          <input type="submit" value="Search" class="button">
          <span class="mini-icon search-input"></span>
        </div>
        <input type="hidden" name="type" value="Everything" />
        <input type="hidden" name="repo" value="" />
        <input type="hidden" name="langOverride" value="" />
        <input type="hidden" name="start_value" value="1" />
</form>      <ul class="top-nav">
          <li class="explore"><a href="https://github.com/explore">Explore</a></li>
          <li><a href="https://gist.github.com">Gist</a></li>
          <li><a href="/blog">Blog</a></li>
        <li><a href="http://help.github.com">Help</a></li>
      </ul>
    </div>


            


  <div id="userbox">
    <div id="user">
      <a href="https://github.com/memo"><img height="20" src="https://secure.gravatar.com/avatar/b5c0e3c2630097b29680cfeda464024c?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>
      <a href="https://github.com/memo" class="name">memo</a>
    </div>
    <ul id="user-links">
      <li>
        <a href="/inbox/notifications" id="notifications" class="tooltipped downwards" title="Notifications">
          <span class="mini-icon notifications"></span>
          <span class="unread_count">22</span>
        </a>
      </li>
      <li><a href="/settings/profile" id="settings" class="tooltipped downwards" title="Account Settings"><span class="mini-icon account-settings"></span></a></li>
      <li>
          <a href="/logout" data-method="post" id="logout" class="tooltipped downwards" title="Log Out"><span class="mini-icon logout"></span></a>
      </li>
    </ul>
  </div>



          
        </div>
      </div>

      

            <div class="site hfeed" itemscope itemtype="http://schema.org/WebPage">
      <div class="container hentry">
        <div class="pagehead repohead instapaper_ignore readability-menu">
        <div class="title-actions-bar">
          



              <ul class="pagehead-actions">


          <li class="js-toggler-container watch-button-container ">
            <a href="/jeromeetienne/MicroCache.js/toggle_watch" class="minibutton btn-watch watch-button js-toggler-target" data-method="post" data-remote="true" rel="nofollow"><span><span class="icon"></span>Watch</span></a>
            <a href="/jeromeetienne/MicroCache.js/toggle_watch" class="minibutton btn-watch unwatch-button js-toggler-target" data-method="post" data-remote="true" rel="nofollow"><span><span class="icon"></span>Unwatch</span></a>
          </li>

              <li><a href="/jeromeetienne/MicroCache.js/fork" class="minibutton btn-fork fork-button" data-method="post" rel="nofollow"><span><span class="icon"></span>Fork</span></a></li>



      <li class="repostats">
        <ul class="repo-stats">
          <li class="watchers ">
            <a href="/jeromeetienne/MicroCache.js/watchers" title="Watchers" class="tooltipped downwards">
              19
            </a>
          </li>
          <li class="forks">
            <a href="/jeromeetienne/MicroCache.js/network" title="Forks" class="tooltipped downwards">
              2
            </a>
          </li>
        </ul>
      </li>
    </ul>

          <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title">
            <span class="mini-icon public-repo"></span>
            <span class="author vcard">
<a href="/jeromeetienne" class="url fn" itemprop="url" rel="author">              <span itemprop="title">jeromeetienne</span>
              </a></span> /
            <strong><a href="/jeromeetienne/MicroCache.js" class="js-current-repository">MicroCache.js</a></strong>
          </h1>
        </div>

          

  <ul class="tabs">
    <li><a href="/jeromeetienne/MicroCache.js" class="selected" highlight="repo_sourcerepo_downloadsrepo_commitsrepo_tagsrepo_branches">Code</a></li>
    <li><a href="/jeromeetienne/MicroCache.js/network" highlight="repo_network">Network</a>
    <li><a href="/jeromeetienne/MicroCache.js/pulls" highlight="repo_pulls">Pull Requests <span class='counter'>0</span></a></li>

      <li><a href="/jeromeetienne/MicroCache.js/issues" highlight="repo_issues">Issues <span class='counter'>0</span></a></li>


    <li><a href="/jeromeetienne/MicroCache.js/graphs" highlight="repo_graphsrepo_contributors">Stats &amp; Graphs</a></li>

  </ul>

      <div id="repo_details" class="metabox clearfix
        not-editable">
      <div id="repo_details_loader" class="metabox-loader" style="display:none">Sending Request&hellip;</div>

      <div class="repo-desc-homepage">
          
      <div class="repository-lang-stats">
        <div class="repository-lang-stats-graph">
        <span data-lang="JavaScript" style="width:100%" itemprop="keywords">JavaScript</span>
        </div>
        <ol class="list-tip">
          <li>
              <a href="/languages/JavaScript">
                <span data-lang="JavaScript" class="color-block"></span>
                <span class="lang">JavaScript</span>
                <span class="percent">100%</span>
              </a>
          </li>
        </ol>
      </div>

<div id="repository_description" class="repository-description">
    <p>micro library to handle in-memory cache (works in node+browser)
      <span id="read_more" style="display:none">&mdash; <a href="#readme">Read more</a></span>
    </p>
</div>


<div class="repository-homepage" id="repository_homepage">
  <p><a href="http://blog.jetienne.com/blog/2011/09/05/microcache.js/" rel="nofollow">http://blog.jetienne.com/blog/2011/09/05/microcache.js/</a></p>
</div>


      </div>

      <div class="edit-repo-desc-homepage" style="display:none">
<form accept-charset="UTF-8" action="/jeromeetienne/MicroCache.js/admin/update_meta" id="js-update-repo-meta-form" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><div style="margin:0;padding:0;display:inline"><input name="_method" type="hidden" value="put" /><input name="authenticity_token" type="hidden" value="tutjoGXwMpRVBFmFX3aL8ohwcHh1qif7ruvkl9YGr7I=" /></div>          <p class="error" style="display:none">Sorry, but there was a problem saving your changes.</p>

          <div class="placeholder-field description-field-wrap js-placeholder-field">
            <label class="placeholder" for="repository-description-field" data-placeholder-mode="sticky">Add a description to this repository</label>
            <input type="text" id="repository-description-field" class="description-field" name="repo_description" value="micro library to handle in-memory cache (works in node+browser)" />
          </div>

          <div class="placeholder-field homepage-field-wrap js-placeholder-field">
            <label class="placeholder" for="repository-homepage-field" data-placeholder-mode="sticky">Add a website to this repository</label>
            <input type="text" id="repository-homepage-field" class="homepage-field" name="repo_homepage" value="http://blog.jetienne.com/blog/2011/09/05/microcache.js/" />
          </div>

          <button type="submit" class="classy save-button"><span>Save Changes</span></button>
          <p class="cancel"><a href="#" class="danger">Cancel</a></p>
</form>      </div>

      
<div class="url-box">
  <ul class="native-clones">
      <li><a href="github-mac://openRepo/https://github.com/jeromeetienne/MicroCache.js" class="minibutton btn-clone-in-mac "><span><span class="icon"></span> Clone in Mac</span></a></li>
      <li><a href="/jeromeetienne/MicroCache.js/zipball/master" class="minibutton btn-download " rel="nofollow" title="Download this repository as a zip file"><span><span class="icon"></span>ZIP</span></a>
  </ul>

  <ul class="clone-urls">
      <li class="http_clone_url"><a href="https://github.com/jeromeetienne/MicroCache.js.git" data-permissions="Read-Only">HTTP</a></li>
        <li class="public_clone_url"><a href="git://github.com/jeromeetienne/MicroCache.js.git" data-permissions="Read-Only">Git Read-Only</a></li>
  </ul>
  <input type="text" spellcheck="false" class="url-field" />
  <span class="js-clippy mini-icon clippy url-box-clippy" data-clipboard-text="" data-copied-hint="copied!" data-copy-hint="copy to clipboard"></span>
  <p class="url-description"><span class="bold">Read+Write</span> access</p>
</div>

    </div>

<div class="frame frame-center tree-finder" style="display:none"
      data-tree-list-url="/jeromeetienne/MicroCache.js/tree-list/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7"
      data-blob-url-prefix="/jeromeetienne/MicroCache.js/blob/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7"
    >

  <div class="breadcrumb">
    <span class="bold"><a href="/jeromeetienne/MicroCache.js">MicroCache.js</a></span> /
    <input class="tree-finder-input js-navigation-enable" type="text" name="query" autocomplete="off" spellcheck="false">
  </div>

    <div class="octotip">
      <p>
        <a href="/jeromeetienne/MicroCache.js/dismiss-tree-finder-help" class="dismiss js-dismiss-tree-list-help" title="Hide this notice forever" rel="nofollow">Dismiss</a>
        <span class="bold">Octotip:</span> You've activated the <em>file finder</em>
        by pressing <span class="kbd">t</span> Start typing to filter the
        file list. Use <span class="kbd badmono">↑</span> and
        <span class="kbd badmono">↓</span> to navigate,
        <span class="kbd">enter</span> to view files.
      </p>
    </div>

  <table class="tree-browser" cellpadding="0" cellspacing="0">
    <tr class="js-header"><th>&nbsp;</th><th>name</th></tr>
    <tr class="js-no-results no-results" style="display: none">
      <th colspan="2">No matching files</th>
    </tr>
    <tbody class="js-results-list js-navigation-container">
    </tbody>
  </table>
</div>

<div id="jump-to-line" style="display:none">
  <h2>Jump to Line</h2>
  <form accept-charset="UTF-8">
    <input name="utf8" type="hidden" value="&#x2713;" />
    <input class="textfield" type="text">
    <div class="full-button">
      <button type="submit" class="classy">
        <span>Go</span>
      </button>
    </div>
  </form>
</div>


<div class="subnav-bar">

  <ul class="actions subnav">
    <li><a href="/jeromeetienne/MicroCache.js/tags" class="blank" highlight="repo_tags">Tags <span class="counter">0</span></a></li>
    <li><a href="/jeromeetienne/MicroCache.js/downloads" class="blank downloads-blank" highlight="repo_downloads">Downloads <span class="counter">0</span></a></li>
    
  </ul>

  <ul class="scope">
    <li class="switcher">

      <div class="context-menu-container js-menu-container">
        <a href="#"
           class="minibutton bigger switcher js-menu-target js-commitish-button btn-branch repo-tree"
           data-master-branch="master"
           data-ref="master">
          <span><span class="icon"></span><i>branch:</i> master</span>
        </a>

        <div class="context-pane commitish-context js-menu-content">
          <a href="javascript:;" class="close js-menu-close"></a>
          <div class="context-title">Switch Branches/Tags</div>
          <div class="context-body pane-selector commitish-selector js-filterable-commitishes">
            <div class="filterbar">
              <div class="placeholder-field js-placeholder-field">
                <label class="placeholder" for="context-commitish-filter-field" data-placeholder-mode="sticky">Filter branches/tags</label>
                <input type="text" id="context-commitish-filter-field" class="commitish-filter" />
              </div>

              <ul class="tabs">
                <li><a href="#" data-filter="branches" class="selected">Branches</a></li>
                <li><a href="#" data-filter="tags">Tags</a></li>
              </ul>
            </div>

              <div class="commitish-item branch-commitish selector-item">
                <h4>
                    <a href="/jeromeetienne/MicroCache.js/tree/master" data-name="master" rel="nofollow">master</a>
                </h4>
              </div>


            <div class="no-results" style="display:none">Nothing to show</div>
          </div>
        </div><!-- /.commitish-context-context -->
      </div>

    </li>
  </ul>

  <ul class="subnav with-scope">

    <li><a href="/jeromeetienne/MicroCache.js" class="selected" highlight="repo_source">Files</a></li>
    <li><a href="/jeromeetienne/MicroCache.js/commits/master" highlight="repo_commits">Commits</a></li>
    <li><a href="/jeromeetienne/MicroCache.js/branches" class="" highlight="repo_branches" rel="nofollow">Branches <span class="counter">1</span></a></li>
  </ul>

</div>

  
  
  


          

        </div><!-- /.repohead -->

        







    
  <p class="last-commit">Latest commit to the <strong>master</strong> branch</p>

<div class="commit commit-tease js-details-container">
  <p class="commit-title ">
      <a href="/jeromeetienne/MicroCache.js/commit/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7" class="message">.getSet() with function to instanciate values + better docs</a>
      
  </p>
  <div class="commit-meta">
    <a href="/jeromeetienne/MicroCache.js/commit/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7" class="sha-block">commit <span class="sha">f7cf656d9a</span></a>
    <span class="js-clippy mini-icon clippy " data-clipboard-text="f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7" data-copied-hint="copied!" data-copy-hint="Copy SHA"></span>

    <div class="authorship">
      <img class="gravatar" height="20" src="https://secure.gravatar.com/avatar/b381880f9f81065247ba9a0b7ff68358?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" />
      <span class="author-name"><a href="/jeromeetienne" rel="author">jeromeetienne</a></span>
      authored <time class="js-relative-date updated" datetime="2011-09-15T20:29:04-07:00" title="2011-09-15 20:29:04">September 15, 2011</time>

    </div>
  </div>
</div>



  <div id="slider">
      <div class="breadcrumb" data-path="/">
        <b itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/jeromeetienne/MicroCache.js/tree/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7" class="js-rewrite-sha" itemprop="url"><span itemprop="title">MicroCache.js</span></a></b> / 
      </div>

        

  <div class="frames">
    <div class="frame frame-center" data-path="/" data-permalink-url="/jeromeetienne/MicroCache.js/tree/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7" data-title="jeromeetienne/MicroCache.js · GitHub" data-type="tree" data-cached-commit-url="/jeromeetienne/microcache.js/cache/commits/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7?commit_sha=f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7&amp;path=">
      <div class="bubble tree-browser-wrapper">
      <table class="tree-browser" cellpadding="0" cellspacing="0">
        <thead>
        <tr class="header">
          <th></th>
          <th>name</th>
          <th>age</th>
          <th>
            <div class="history">
              <a href="/jeromeetienne/MicroCache.js/commits/master/" rel="nofollow">history</a>
            </div>
            message
          </th>
        </tr>
        </thead>
        <tbody>

          <tr class="alt">
            <td class="icon"> <span class="mini-icon directory"></span> </td>
            <td class="content"> <a href="/jeromeetienne/MicroCache.js/tree/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7/tests" class="js-slide-to js-rewrite-sha" id="d41e76c55bbf1b8b9f0964120a6b4b94720eb6d9">tests</a></td>
            <td class="age"> <time class="js-relative-date" datetime="2011-09-15T20:29:04-07:00" title="2011-09-15 20:29:04">September 15, 2011</time> </td>
            <td class="message"> <a href="/jeromeetienne/MicroCache.js/commit/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7" class="message">.getSet() with function to instanciate values + better docs</a> [<a href="/jeromeetienne" rel="author">jeromeetienne</a>] </td>
          </tr>
          <tr class="">
            <td class="icon"> <span class="mini-icon text-file"></span> </td>
            <td class="content"> <a href="/jeromeetienne/MicroCache.js/blob/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7/MIT-LICENSE.txt" class="js-slide-to js-rewrite-sha" id="6d32551450757aa31e41d6045278ee87d9b0daba">MIT-LICENSE.txt</a></td>
            <td class="age"> <time class="js-relative-date" datetime="2011-09-05T02:18:04-07:00" title="2011-09-05 02:18:04">September 05, 2011</time> </td>
            <td class="message"> <a href="/jeromeetienne/MicroCache.js/commit/39265c17f366e1bd2a525eda47e9bcec8fc80f64" class="message">	Initial commit</a> [<a href="/jeromeetienne" rel="author">jeromeetienne</a>] </td>
          </tr>
          <tr class="alt">
            <td class="icon"> <span class="mini-icon text-file"></span> </td>
            <td class="content"> <a href="/jeromeetienne/MicroCache.js/blob/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7/README.md" class="js-slide-to js-rewrite-sha" id="c76d2e82ce4a60adca434151e1df4624c39a7e24">README.md</a></td>
            <td class="age"> <time class="js-relative-date" datetime="2011-09-15T20:29:04-07:00" title="2011-09-15 20:29:04">September 15, 2011</time> </td>
            <td class="message"> <a href="/jeromeetienne/MicroCache.js/commit/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7" class="message">.getSet() with function to instanciate values + better docs</a> [<a href="/jeromeetienne" rel="author">jeromeetienne</a>] </td>
          </tr>
          <tr class="">
            <td class="icon"> <span class="mini-icon text-file"></span> </td>
            <td class="content"> <a href="/jeromeetienne/MicroCache.js/blob/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7/microcache.js" class="js-slide-to js-rewrite-sha" id="d109efaffe489975b10fd0888ca1b8782c7f7ef3">microcache.js</a></td>
            <td class="age"> <time class="js-relative-date" datetime="2011-09-15T20:29:04-07:00" title="2011-09-15 20:29:04">September 15, 2011</time> </td>
            <td class="message"> <a href="/jeromeetienne/MicroCache.js/commit/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7" class="message">.getSet() with function to instanciate values + better docs</a> [<a href="/jeromeetienne" rel="author">jeromeetienne</a>] </td>
          </tr>
          <tr class="alt">
            <td class="icon"> <span class="mini-icon text-file"></span> </td>
            <td class="content"> <a href="/jeromeetienne/MicroCache.js/blob/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7/package.json" class="js-slide-to js-rewrite-sha" id="de35df88e80e6af3360b0df2ee3e34f5d4cc0d92">package.json</a></td>
            <td class="age"> <time class="js-relative-date" datetime="2011-09-05T02:18:04-07:00" title="2011-09-05 02:18:04">September 05, 2011</time> </td>
            <td class="message"> <a href="/jeromeetienne/MicroCache.js/commit/39265c17f366e1bd2a525eda47e9bcec8fc80f64" class="message">	Initial commit</a> [<a href="/jeromeetienne" rel="author">jeromeetienne</a>] </td>
          </tr>
        </tbody>
      </table>
      </div>
      
      <div class="announce instapaper_body md" data-path="/" id="readme"><span class="name"><span class="mini-icon readme"></span> README.md</span><article class="markdown-body entry-content" itemprop="mainContentOfPage"><p><a href="https://github.com/jeromeetienne/MicroCache.js">microcache.js</a> is a micro library
to handle in-memory cache (works in node+browser).</p>

<h1>Install it</h1>

<p>To install it on node</p>

<pre><code>npm install microcache
</code></pre>

<p>To install the browser version, download it and include it like that</p>

<pre><code>&lt;script src="microcache.js"&gt;&lt;/script&gt;   
</code></pre>

<h1>API</h1>

<p>To instanciate a cache, do the following. You can have as many instances you want.</p>

<pre><code>var microcache = new MicroCache();
</code></pre>

<h2>.get(key)</h2>

<p>To get a cached asset which is in the cache. Each cached element has a unique
key to identify it.</p>

<pre><code>microcache.get('foo');
</code></pre>

<h2>.set(key, value)</h2>

<p>To set a element value in the cache.</p>

<pre><code>microcache.set('foo', 'bar');
</code></pre>

<h2>.contains(key)</h2>

<p>To know if a given asset is currently in the cache.</p>

<pre><code>microcache.contains('foo');
</code></pre>

<h2>.values()</h2>

<p>To return all the elements currently in the cache</p>

<pre><code>microcache.values();
</code></pre>

<h2>.getSet(key, value)</h2>

<p>To get an element from the cache, if it isnt already present, store it then return it.</p>

<pre><code>microcache.getSet(key, value);
</code></pre>

<p>If second parameter is a function, it is called only if the key isnt contained
in the cache. Thus the value isn't instanciated without need.</p>

<pre><code>microcache.getSet(key, function(){ return value });
</code></pre>

<h2>FAQ</h2>

<ul>
<li>
<strong>Q.</strong> what about plain <code>var microcache = {}</code> ? isnt this wrapper overengineering ?</li>
<li>
<strong>A.</strong>  i was thinking so too at first. but the syntax of a .getSet() without wrapper was too ugly for my taste :)
<code>var a = cache[key] = (cache[key] || value)</code> from @floriancargoet</li>
</ul></article></div>
    </div>
  </div>
  <br style="clear:both;">


<br style="clear:both;">

<div class="frame frame-loading large-loading-area" style="display:none;" data-tree-list-url="/jeromeetienne/microcache.js/tree-list/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7" data-blob-url-prefix="/jeromeetienne/MicroCache.js/blob/f7cf656d9a5ba1adaadb25f5b6646bbb5b2a08f7">
  <img src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-64.gif?1329921026" height="64" width="64">
</div>


  </div>

      </div>
      <div class="context-overlay"></div>
    </div>

      <div id="footer-push"></div><!-- hack for sticky footer -->
    </div><!-- end of wrapper - hack for sticky footer -->

      <!-- footer -->
      <div id="footer" >
        
  <div class="upper_footer">
     <div class="container clearfix">

       <!--[if IE]><h4 id="blacktocat_ie">GitHub Links</h4><![endif]-->
       <![if !IE]><h4 id="blacktocat">GitHub Links</h4><![endif]>

       <ul class="footer_nav">
         <h4>GitHub</h4>
         <li><a href="https://github.com/about">About</a></li>
         <li><a href="https://github.com/blog">Blog</a></li>
         <li><a href="https://github.com/features">Features</a></li>
         <li><a href="https://github.com/contact">Contact &amp; Support</a></li>
         <li><a href="https://github.com/training">Training</a></li>
         <li><a href="http://enterprise.github.com/">GitHub Enterprise</a></li>
         <li><a href="http://status.github.com/">Site Status</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Tools</h4>
         <li><a href="http://get.gaug.es/">Gauges: Analyze web traffic</a></li>
         <li><a href="http://speakerdeck.com">Speaker Deck: Presentations</a></li>
         <li><a href="https://gist.github.com">Gist: Code snippets</a></li>
         <li><a href="http://mac.github.com/">GitHub for Mac</a></li>
         <li><a href="http://mobile.github.com/">Issues for iPhone</a></li>
         <li><a href="http://jobs.github.com/">Job Board</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Extras</h4>
         <li><a href="http://shop.github.com/">GitHub Shop</a></li>
         <li><a href="http://octodex.github.com/">The Octodex</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Documentation</h4>
         <li><a href="http://help.github.com/">GitHub Help</a></li>
         <li><a href="http://developer.github.com/">Developer API</a></li>
         <li><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></li>
         <li><a href="http://pages.github.com/">GitHub Pages</a></li>
       </ul>

     </div><!-- /.site -->
  </div><!-- /.upper_footer -->

<div class="lower_footer">
  <div class="container clearfix">
    <!--[if IE]><div id="legal_ie"><![endif]-->
    <![if !IE]><div id="legal"><![endif]>
      <ul>
          <li><a href="https://github.com/site/terms">Terms of Service</a></li>
          <li><a href="https://github.com/site/privacy">Privacy</a></li>
          <li><a href="https://github.com/security">Security</a></li>
      </ul>

      <p>&copy; 2012 <span title="0.13266s from fe12.rs.github.com">GitHub</span> Inc. All rights reserved.</p>
    </div><!-- /#legal or /#legal_ie-->

      <div class="sponsor">
        <a href="http://www.rackspace.com" class="logo">
          <img alt="Dedicated Server" height="36" src="https://a248.e.akamai.net/assets.github.com/images/modules/footer/rackspaces_logo.png?1329521040" width="38" />
        </a>
        Powered by the <a href="http://www.rackspace.com ">Dedicated
        Servers</a> and<br/> <a href="http://www.rackspacecloud.com">Cloud
        Computing</a> of Rackspace Hosting<span>&reg;</span>
      </div>
  </div><!-- /.site -->
</div><!-- /.lower_footer -->

      </div><!-- /#footer -->

    

<div id="keyboard_shortcuts_pane" class="instapaper_ignore readability-extra" style="display:none">
  <h2>Keyboard Shortcuts <small><a href="#" class="js-see-all-keyboard-shortcuts">(see all)</a></small></h2>

  <div class="columns threecols">
    <div class="column first">
      <h3>Site wide shortcuts</h3>
      <dl class="keyboard-mappings">
        <dt>s</dt>
        <dd>Focus site search</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>?</dt>
        <dd>Bring up this help dialog</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column middle" style='display:none'>
      <h3>Commit list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>c <em>or</em> o <em>or</em> enter</dt>
        <dd>Open commit</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>y</dt>
        <dd>Expand URL to its canonical form</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column last" style='display:none'>
      <h3>Pull request list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>o <em>or</em> enter</dt>
        <dd>Open issue</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
        <dd>Submit comment</dd>
      </dl>
    </div><!-- /.columns.last -->

  </div><!-- /.columns.equacols -->

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>x</dt>
          <dd>Toggle selection</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column middle">
        <dl class="keyboard-mappings">
          <dt>I</dt>
          <dd>Mark selection as read</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>U</dt>
          <dd>Mark selection as unread</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Remove selection from view</dd>
        </dl>
      </div><!-- /.column.middle -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>c</dt>
          <dd>Create issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Create label</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>i</dt>
          <dd>Back to inbox</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>u</dt>
          <dd>Back to issues</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>/</dt>
          <dd>Focus issues search</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues Dashboard</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
      </div><!-- /.column.first -->
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Network Graph</h3>
    <div class="columns equacols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt><span class="badmono">←</span> <em>or</em> h</dt>
          <dd>Scroll left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">→</span> <em>or</em> l</dt>
          <dd>Scroll right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↑</span> <em>or</em> k</dt>
          <dd>Scroll up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↓</span> <em>or</em> j</dt>
          <dd>Scroll down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Toggle visibility of head labels</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">←</span> <em>or</em> shift h</dt>
          <dd>Scroll all the way left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">→</span> <em>or</em> shift l</dt>
          <dd>Scroll all the way right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↑</span> <em>or</em> shift k</dt>
          <dd>Scroll all the way up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↓</span> <em>or</em> shift j</dt>
          <dd>Scroll all the way down</dd>
        </dl>
      </div><!-- /.column.last -->
    </div>
  </div>

  <div >
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first" >
        <h3>Source Code Browsing</h3>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Activates the file finder</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Jump to line</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>w</dt>
          <dd>Switch branch/tag</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Expand URL to its canonical form</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first">
        <h3>Browsing Commits</h3>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>escape</dt>
          <dd>Close form</dd>
        </dl>
      </div>
    </div>
  </div>
</div>

    <div id="markdown-help" class="instapaper_ignore readability-extra">
  <h2>Markdown Cheat Sheet</h2>

  <div class="cheatsheet-content">

  <div class="mod">
    <div class="col">
      <h3>Format Text</h3>
      <p>Headers</p>
      <pre>
# This is an &lt;h1&gt; tag
## This is an &lt;h2&gt; tag
###### This is an &lt;h6&gt; tag</pre>
     <p>Text styles</p>
     <pre>
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__

*You **can** combine them*
</pre>
    </div>
    <div class="col">
      <h3>Lists</h3>
      <p>Unordered</p>
      <pre>
* Item 1
* Item 2
  * Item 2a
  * Item 2b</pre>
     <p>Ordered</p>
     <pre>
1. Item 1
2. Item 2
3. Item 3
   * Item 3a
   * Item 3b</pre>
    </div>
    <div class="col">
      <h3>Miscellaneous</h3>
      <p>Images</p>
      <pre>
![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)
</pre>
     <p>Links</p>
     <pre>
http://github.com - automatic!
[GitHub](http://github.com)</pre>
<p>Blockquotes</p>
     <pre>
As Kanye West said:

> We're living the future so
> the present is our past.
</pre>
    </div>
  </div>
  <div class="rule"></div>

  <h3>Code Examples in Markdown</h3>
  <div class="col">
      <p>Syntax highlighting with <a href="http://github.github.com/github-flavored-markdown/" title="GitHub Flavored Markdown" target="_blank">GFM</a></p>
      <pre>
```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```</pre>
    </div>
    <div class="col">
      <p>Or, indent your code 4 spaces</p>
      <pre>
Here is a Python code example
without syntax highlighting:

    def foo:
      if not bar:
        return true</pre>
    </div>
    <div class="col">
      <p>Inline code for comments</p>
      <pre>
I think you should use an
`&lt;addr&gt;` element here instead.</pre>
    </div>
  </div>

  </div>
</div>


    <div class="ajax-error-message">
      <p><span class="icon"></span> Something went wrong with that request. Please try again. <a href="javascript:;" class="ajax-error-dismiss">Dismiss</a></p>
    </div>

    <div id="logo-popup">
      <h2>Looking for the GitHub logo?</h2>
      <ul>
        <li>
          <h4>GitHub Logo</h4>
          <a href="http://github-media-downloads.s3.amazonaws.com/GitHub_Logos.zip"><img alt="Github_logo" src="https://a248.e.akamai.net/assets.github.com/images/modules/about_page/github_logo.png?1315937721" /></a>
          <a href="http://github-media-downloads.s3.amazonaws.com/GitHub_Logos.zip" class="minibutton btn-download download"><span><span class="icon"></span>Download</span></a>
        </li>
        <li>
          <h4>The Octocat</h4>
          <a href="http://github-media-downloads.s3.amazonaws.com/Octocats.zip"><img alt="Octocat" src="https://a248.e.akamai.net/assets.github.com/images/modules/about_page/octocat.png?1315937721" /></a>
          <a href="http://github-media-downloads.s3.amazonaws.com/Octocats.zip" class="minibutton btn-download download"><span><span class="icon"></span>Download</span></a>
        </li>
      </ul>
    </div>

    
    
    
    <span id='server_response_time' data-time='0.13581' data-host='fe12'></span>
  </body>
</html>

