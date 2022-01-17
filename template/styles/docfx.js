// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.
$(function () {
  var active = 'active';
  var expanded = 'in';
  var collapsed = 'collapsed';
  var filtered = 'filtered';
  var show = 'show';
  var hide = 'hide';
  var util = new utility();

  renderSidebar();
  renderBreadcrumb();
  renderAffix();

  function renderSidebar() {
    var sidetoc = $('#sidetoggle .sidetoc')[0];
    if (typeof (sidetoc) === 'undefined') {
      loadToc();
    } else {
      registerTocEvents();
      if ($('footer').is(':visible')) {
        $('.sidetoc').addClass('shiftup');
      }

      // Scroll to active item
      var top = 0;
      $('#toc a.active').parents('li').each(function (i, e) {
        //$(e).addClass(active).addClass(expanded);
        $(e).addClass(expanded);
        $(e).children('a').addClass(active);
      })
      $('#toc a.active').parents('li').first().each(function (i, e) {
        //$(e).addClass(active).addClass(expanded);
        $(e).addClass(active);
      })
      $('#toc a.active').parents('li').each(function (i, e) {
        top += $(e).position().top;
      })
      $('.sidetoc').scrollTop(top - 50);

      if ($('footer').is(':visible')) {
        $('.sidetoc').addClass('shiftup');
      }

      renderBreadcrumb();
    }

    function registerTocEvents() {
      var tocFilterInput = $('#toc_filter_input');
      var tocFilterClearButton = $('#toc_filter_clear');
        
      $('.toc .nav > li > .expand-stub').click(function (e) {
        $(e.target).parent().toggleClass(expanded);
      });
      $('.toc .nav > li > .expand-stub + a:not([href])').click(function (e) {
        $(e.target).parent().toggleClass(expanded);
      });
      tocFilterInput.on('input', function (e) {
        var val = this.value;
        //Save filter string to local session storage
        if (typeof(Storage) !== "undefined") {
          try {
            sessionStorage.filterString = val;
            }
          catch(e)
            {}
        }
        if (val === '') {
          // Clear 'filtered' class
          $('#toc li').removeClass(filtered).removeClass(hide);
          tocFilterClearButton.fadeOut();
          return;
        }
        tocFilterClearButton.fadeIn();

        // set all parent nodes status
        $('#toc li>a').filter(function (i, e) {
          return $(e).siblings().length > 0
        }).each(function (i, anchor) {
          var parent = $(anchor).parent();
          parent.addClass(hide);
          parent.removeClass(show);
          parent.removeClass(filtered);
        })
        
        // Get leaf nodes
        $('#toc li>a').filter(function (i, e) {
          return $(e).siblings().length === 0
        }).each(function (i, anchor) {
          var text = $(anchor).attr('title');
          var parent = $(anchor).parent();
          var parentNodes = parent.parents('ul>li');
          for (var i = 0; i < parentNodes.length; i++) {
            var parentText = $(parentNodes[i]).children('a').attr('title');
            if (parentText) text = parentText + '.' + text;
          };
          if (filterNavItem(text, val)) {
            parent.addClass(show);
            parent.removeClass(hide);
          } else {
            parent.addClass(hide);
            parent.removeClass(show);
          }
        });
        $('#toc li>a').filter(function (i, e) {
          return $(e).siblings().length > 0
        }).each(function (i, anchor) {
          var parent = $(anchor).parent();
          if (parent.find('li.show').length > 0) {
            parent.addClass(show);
            parent.addClass(filtered);
            parent.removeClass(hide);
          } else {
            parent.addClass(hide);
            parent.removeClass(show);
            parent.removeClass(filtered);
          }
        })

        function filterNavItem(name, text) {
          if (!text) return true;
          if (name && name.toLowerCase().indexOf(text.toLowerCase()) > -1) return true;
          return false;
        }
      });
      
      // toc filter clear button
      tocFilterClearButton.hide();
      tocFilterClearButton.on("click", function(e){
        tocFilterInput.val("");
        tocFilterInput.trigger('input');
        if (typeof(Storage) !== "undefined") {
          try {
            sessionStorage.filterString = "";
            }
          catch(e)
            {}
        }
      });

      //Set toc filter from local session storage on page load
      if (typeof(Storage) !== "undefined") {
        try {
          tocFilterInput.val(sessionStorage.filterString);
          tocFilterInput.trigger('input');
          }
        catch(e)
          {}
      }
    }

    function loadToc() {
      var tocPath = $("meta[property='docfx\\:tocrel']").attr("content");
      if (!tocPath) {
        return;
      }
      tocPath = tocPath.replace(/\\/g, '/');
      $('#sidetoc').load(tocPath + " #sidetoggle > div", function () {
        var index = tocPath.lastIndexOf('/');
        var tocrel = '';
        if (index > -1) {
          tocrel = tocPath.substr(0, index + 1);
        }
        var currentHref = util.getCurrentWindowAbsolutePath();
        if(!currentHref.endsWith('.html')) {
          currentHref += '.html';
        }
        $('#sidetoc').find('a[href]').each(function (i, e) {
          var href = $(e).attr("href");
          if (util.isRelativePath(href)) {
            href = tocrel + href;
            $(e).attr("href", href);
          }

          if (util.getAbsolutePath(e.href) === currentHref) {
            $(e).addClass(active);
          }

          $(e).breakWord();
        });

        renderSidebar();
      });
    }
  }

  function renderBreadcrumb() {
    var breadcrumb = [];
    $('#navbar a.active').each(function (i, e) {
      breadcrumb.push({
        href: e.href,
        name: e.innerHTML
      });
    })
    $('#toc a.active').each(function (i, e) {
      breadcrumb.push({
        href: e.href,
        name: e.innerHTML
      });
    })

    var html = util.formList(breadcrumb, 'breadcrumb');
    $('#breadcrumb').html(html);
  }

  //Setup Affix
  function renderAffix() {
    var hierarchy = getHierarchy();
    if (!hierarchy || hierarchy.length <= 0) {
      $("#affix").hide();
    }
    else {
      var html = util.formList(hierarchy, ['nav', 'bs-docs-sidenav is-undecorated-list']);
      $("#affix>div").empty().append(html);
      if ($('footer').is(':visible')) {
        $(".sideaffix").css("bottom", "70px");
      }
      $('#affix a').click(function(e) {
        var scrollspy = $('[data-spy="scroll"]').data()['bs.scrollspy'];
        var target = e.target.hash;
        if (scrollspy && target) {
          scrollspy.activate(target);
        }
      });
    }
  }

  function getHierarchy() {
    // supported headers are h1, h2, h3, and h4
    var $headers = $($.map(['h1', 'h2', 'h3', 'h4'], function (h) { return ".article article " + h; }).join(", "));

    // a stack of hierarchy items that are currently being built
    var stack = [];
    $headers.each(function (i, e) {
      if (!e.id) {
        return;
      }

      var item = {
        name: htmlEncode($(e).text()),
        href: "#" + e.id,
        items: []
      };

      if (!stack.length) {
        stack.push({ type: e.tagName, siblings: [item] });
        return;
      }

      var frame = stack[stack.length - 1];
      if (e.tagName === frame.type) {
        frame.siblings.push(item);
      } else if (e.tagName[1] > frame.type[1]) {
        // we are looking at a child of the last element of frame.siblings.
        // push a frame onto the stack. After we've finished building this item's children,
        // we'll attach it as a child of the last element
        stack.push({ type: e.tagName, siblings: [item] });
      } else {  // e.tagName[1] < frame.type[1]
        // we are looking at a sibling of an ancestor of the current item.
        // pop frames from the stack, building items as we go, until we reach the correct level at which to attach this item.
        while (e.tagName[1] < stack[stack.length - 1].type[1]) {
          buildParent();
        }
        if (e.tagName === stack[stack.length - 1].type) {
          stack[stack.length - 1].siblings.push(item);
        } else {
          stack.push({ type: e.tagName, siblings: [item] });
        }
      }
    });
    while (stack.length > 1) {
      buildParent();
    }

    function buildParent() {
      var childrenToAttach = stack.pop();
      var parentFrame = stack[stack.length - 1];
      var parent = parentFrame.siblings[parentFrame.siblings.length - 1];
      $.each(childrenToAttach.siblings, function (i, child) {
        parent.items.push(child);
      });
    }
    if (stack.length > 0) {

      var topLevel = stack.pop().siblings;
      if (topLevel.length === 1) {  // if there's only one topmost header, dump it
        return topLevel[0].items;
      }
      return topLevel;
    }
    return undefined;
  }

  function htmlEncode(str) {
    if (!str) return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function htmlDecode(value) {
    if (!str) return str;
    return value
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  }

  function cssEscape(str) {
    // see: http://stackoverflow.com/questions/2786538/need-to-escape-a-special-character-in-a-jquery-selector-string#answer-2837646
    if (!str) return str;
    return str
      .replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
  }

  function utility() {
    this.getAbsolutePath = getAbsolutePath;
    this.isRelativePath = isRelativePath;
    this.isAbsolutePath = isAbsolutePath;
    this.getCurrentWindowAbsolutePath = getCurrentWindowAbsolutePath;
    this.getDirectory = getDirectory;
    this.formList = formList;

    function getAbsolutePath(href) {
      if (isAbsolutePath(href)) return href;
      var currentAbsPath = getCurrentWindowAbsolutePath();
      var stack = currentAbsPath.split("/");
      stack.pop();
      var parts = href.split("/");
      for (var i=0; i< parts.length; i++) {
        if (parts[i] == ".") continue;
        if (parts[i] == ".." && stack.length > 0)
          stack.pop();
        else
          stack.push(parts[i]);
      }
      var p = stack.join("/");
      return p;
    }

    function isRelativePath(href) {
      if (href === undefined || href === '' || href[0] === '/') {
        return false;
      }
      return !isAbsolutePath(href);
    }

    function isAbsolutePath(href) {
      return (/^(?:[a-z]+:)?\/\//i).test(href);
    }

    function getCurrentWindowAbsolutePath() {
      return window.location.origin + window.location.pathname;
    }
    function getDirectory(href) {
      if (!href) return '';
      var index = href.lastIndexOf('/');
      if (index == -1) return '';
      if (index > -1) {
        return href.substr(0, index);
      }
    }

    function formList(item, classes) {
      var level = 1;
      var model = {
        items: item
      };
      var cls = [].concat(classes).join(" ");
      return getList(model, cls);

      function getList(model, cls) {
        if (!model || !model.items) return null;
        var l = model.items.length;
        if (l === 0) return null;
        var html = '<ul class="level' + level + ' ' + (cls || '') + '">';
        level++;
        for (var i = 0; i < l; i++) {
          var item = model.items[i];
          var href = item.href;
          var name = item.name;
          if (!name) continue;
          html += href ? '<li><a href="' + href + '">' + name + '</a>' : '<li>' + name;
          html += getList(item, cls) || '';
          html += '</li>';
        }
        html += '</ul>';
        return html;
      }
    }

    /**
     * Add <wbr> into long word.
     * @param {String} text - The word to break. It should be in plain text without HTML tags.
     */
    function breakPlainText(text) {
      if (!text) return text;
      return text.replace(/([a-z])([A-Z])|(\.)(\w)/g, '$1$3<wbr>$2$4')
    }

    /**
     * Add <wbr> into long word. The jQuery element should contain no html tags.
     * If the jQuery element contains tags, this function will not change the element.
     */
    $.fn.breakWord = function () {
      if (this.html() == this.text()) {
        this.html(function (index, text) {
          return breakPlainText(text);
        })
      }
      return this;
    }
  }

});
