module Jekyll
  module DateSortFilter
    def sort_by_timestamp(collection)
      collection.sort_by { |item| item.data['timestamp'] || Time.at(0) }.reverse
    end
  end
end

Liquid::Template.register_filter(Jekyll::DateSortFilter)
